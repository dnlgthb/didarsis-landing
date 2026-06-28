import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { APP_LABELS, isValidApp } from "@/lib/aulaApps";
import { normalizeName, rosterIncludes } from "@/lib/roster";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const body = await request.json();
  const { studentName, app } = body;

  if (!studentName || typeof studentName !== "string" || studentName.trim().length < 2) {
    return NextResponse.json({ error: "Nombre del estudiante requerido" }, { status: 400 });
  }

  const { data: session } = await supabase
    .from("classroom_sessions")
    .select("id, active, expires_at, app, name_mode, roster, operation_types")
    .eq("code", code.toUpperCase())
    .eq("active", true)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Sesión no encontrada" }, { status: 404 });
  }

  if (new Date(session.expires_at) < new Date()) {
    return NextResponse.json({ error: "Sesión expirada" }, { status: 410 });
  }

  // Modo lista: el nombre debe estar en la lista del profe y no estar tomado.
  if (session.name_mode === "roster") {
    const roster: string[] = Array.isArray(session.roster) ? session.roster : [];

    if (!rosterIncludes(roster, studentName)) {
      return NextResponse.json(
        { error: "Ese nombre no está en la lista de la clase" },
        { status: 403 },
      );
    }

    const { data: taken } = await supabase
      .from("session_students")
      .select("student_name")
      .eq("session_id", session.id);

    const isTaken = (taken || []).some(
      (s) => normalizeName(s.student_name) === normalizeName(studentName),
    );

    if (isTaken) {
      return NextResponse.json(
        { error: "Ese nombre ya fue elegido por otro estudiante" },
        { status: 409 },
      );
    }
  }

  // Bloqueo: la sesión es para una app específica y el estudiante viene de otra.
  // Builds antiguos no envían `app` — entran igual (best-effort).
  if (isValidApp(session.app) && app && app !== session.app) {
    return NextResponse.json(
      { error: `Este código es para ${APP_LABELS[session.app]}` },
      { status: 403 },
    );
  }

  const { data: student, error } = await supabase
    .from("session_students")
    .insert({
      session_id: session.id,
      student_name: studentName.trim(),
      app: isValidApp(app) ? app : null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: "Error al unirse" }, { status: 500 });
  }

  return NextResponse.json({
    studentId: student.id,
    operationTypes: Array.isArray(session.operation_types)
      ? session.operation_types
      : [],
  });
}
