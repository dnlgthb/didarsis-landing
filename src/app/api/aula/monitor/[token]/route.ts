import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { OP_LABELS } from "@/lib/aulaApps";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const { data: session } = await supabase
    .from("classroom_sessions")
    .select("id, code, teacher_name, operation_type, operation_types, app, active, created_at, expires_at")
    .eq("monitor_token", token)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Sesión no encontrada" }, { status: 404 });
  }

  const { data: students } = await supabase
    .from("session_students")
    .select("id, student_name, app, completed, errors, max_streak, coins, joined_at, last_active_at")
    .eq("session_id", session.id)
    .order("joined_at", { ascending: true });

  // Detalle de secciones: conteo de eventos por operación, por estudiante
  const sectionsByStudent: Record<string, Record<string, number>> = {};
  const studentIds = (students || []).map((s) => s.id);
  if (studentIds.length > 0) {
    const { data: events } = await supabase
      .from("progress_events")
      .select("student_id, operation_type")
      .in("student_id", studentIds)
      .in("event_type", ["correct", "error"]);

    for (const e of events || []) {
      if (!e.operation_type) continue;
      const byOp = (sectionsByStudent[e.student_id] ??= {});
      byOp[e.operation_type] = (byOp[e.operation_type] || 0) + 1;
    }
  }

  const studentsWithSections = (students || []).map((s) => ({
    ...s,
    sections: Object.entries(sectionsByStudent[s.id] || {})
      .map(([op, count]) => ({ op, label: OP_LABELS[op] || op, count }))
      .sort((a, b) => b.count - a.count),
  }));

  return NextResponse.json({
    session: {
      code: session.code,
      teacherName: session.teacher_name,
      operationType: session.operation_type,
      operationTypes: Array.isArray(session.operation_types) ? session.operation_types : [],
      app: session.app,
      active: session.active,
      createdAt: session.created_at,
      expiresAt: session.expires_at,
    },
    students: studentsWithSections,
  });
}

// Libera (quita) a un estudiante de la sesión. Útil cuando alguien entró mal
// (p.ej. eligió un nombre equivocado en modo lista): al borrarlo, su nombre
// vuelve a quedar disponible para elegir. Autorizado por el monitor_token.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const body = await request.json().catch(() => ({}));
  const studentId = body?.studentId;
  if (typeof studentId !== "string" || !studentId) {
    return NextResponse.json({ error: "studentId requerido" }, { status: 400 });
  }

  const { data: session } = await supabase
    .from("classroom_sessions")
    .select("id")
    .eq("monitor_token", token)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Sesión no encontrada" }, { status: 404 });
  }

  // Verificar que el estudiante pertenece a ESTA sesión antes de borrar nada.
  const { data: student } = await supabase
    .from("session_students")
    .select("id")
    .eq("id", studentId)
    .eq("session_id", session.id)
    .single();

  if (!student) {
    return NextResponse.json({ error: "Estudiante no encontrado" }, { status: 404 });
  }

  // Borrar primero sus eventos (evita conflictos de llave foránea), luego el
  // estudiante. Así su nombre de la lista vuelve a quedar libre.
  await supabase.from("progress_events").delete().eq("student_id", studentId);
  const { error } = await supabase
    .from("session_students")
    .delete()
    .eq("id", studentId)
    .eq("session_id", session.id);

  if (error) {
    return NextResponse.json(
      { error: "No se pudo liberar al estudiante" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
