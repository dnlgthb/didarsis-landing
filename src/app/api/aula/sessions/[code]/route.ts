import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { APP_LABELS, isValidApp } from "@/lib/aulaApps";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const { data, error } = await supabase
    .from("classroom_sessions")
    .select("id, code, teacher_name, operation_type, app, active, expires_at")
    .eq("code", code.toUpperCase())
    .eq("active", true)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Sesión no encontrada" }, { status: 404 });
  }

  if (new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: "Sesión expirada" }, { status: 410 });
  }

  return NextResponse.json({
    sessionId: data.id,
    code: data.code,
    teacherName: data.teacher_name,
    operationType: data.operation_type,
    app: data.app,
    appLabel: isValidApp(data.app) ? APP_LABELS[data.app] : null,
  });
}
