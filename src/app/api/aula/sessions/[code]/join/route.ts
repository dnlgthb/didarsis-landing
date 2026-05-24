import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const body = await request.json();
  const { studentName } = body;

  if (!studentName || typeof studentName !== "string" || studentName.trim().length < 2) {
    return NextResponse.json({ error: "Nombre del estudiante requerido" }, { status: 400 });
  }

  const { data: session } = await supabase
    .from("classroom_sessions")
    .select("id, active, expires_at")
    .eq("code", code.toUpperCase())
    .eq("active", true)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Sesión no encontrada" }, { status: 404 });
  }

  if (new Date(session.expires_at) < new Date()) {
    return NextResponse.json({ error: "Sesión expirada" }, { status: 410 });
  }

  const { data: student, error } = await supabase
    .from("session_students")
    .insert({
      session_id: session.id,
      student_name: studentName.trim(),
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: "Error al unirse" }, { status: 500 });
  }

  return NextResponse.json({ studentId: student.id });
}
