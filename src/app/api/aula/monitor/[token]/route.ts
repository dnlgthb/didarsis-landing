import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const { data: session } = await supabase
    .from("classroom_sessions")
    .select("id, code, teacher_name, operation_type, active, created_at, expires_at")
    .eq("monitor_token", token)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Sesión no encontrada" }, { status: 404 });
  }

  const { data: students } = await supabase
    .from("session_students")
    .select("id, student_name, completed, errors, max_streak, coins, joined_at, last_active_at")
    .eq("session_id", session.id)
    .order("joined_at", { ascending: true });

  return NextResponse.json({
    session: {
      code: session.code,
      teacherName: session.teacher_name,
      operationType: session.operation_type,
      active: session.active,
      createdAt: session.created_at,
      expiresAt: session.expires_at,
    },
    students: students || [],
  });
}
