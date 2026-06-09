import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { APP_LABELS, isValidApp } from "@/lib/aulaApps";
import { normalizeName } from "@/lib/roster";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const { data, error } = await supabase
    .from("classroom_sessions")
    .select("id, code, teacher_name, operation_type, app, active, expires_at, name_mode, roster")
    .eq("code", code.toUpperCase())
    .eq("active", true)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Sesión no encontrada" }, { status: 404 });
  }

  if (new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: "Sesión expirada" }, { status: 410 });
  }

  const nameMode = data.name_mode === "roster" ? "roster" : "free";
  let availableNames: string[] = [];

  // En modo lista, el estudiante solo puede elegir nombres aún no tomados.
  if (nameMode === "roster") {
    const roster: string[] = Array.isArray(data.roster) ? data.roster : [];

    const { data: students } = await supabase
      .from("session_students")
      .select("student_name")
      .eq("session_id", data.id);

    const taken = new Set((students || []).map((s) => normalizeName(s.student_name)));
    availableNames = roster.filter((n) => !taken.has(normalizeName(n)));
  }

  return NextResponse.json({
    sessionId: data.id,
    code: data.code,
    teacherName: data.teacher_name,
    operationType: data.operation_type,
    app: data.app,
    appLabel: isValidApp(data.app) ? APP_LABELS[data.app] : null,
    nameMode,
    availableNames,
  });
}
