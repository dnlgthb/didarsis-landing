import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { APP_LABELS, isValidApp } from "@/lib/aulaApps";

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
    .select("id, active, expires_at, app")
    .eq("code", code.toUpperCase())
    .eq("active", true)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Sesión no encontrada" }, { status: 404 });
  }

  if (new Date(session.expires_at) < new Date()) {
    return NextResponse.json({ error: "Sesión expirada" }, { status: 410 });
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

  return NextResponse.json({ studentId: student.id });
}
