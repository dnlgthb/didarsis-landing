import { NextResponse } from "next/server";
import { supabase, generateCode } from "@/lib/supabase";
import { isValidApp, parseOperationTypes } from "@/lib/aulaApps";
import { isValidNameMode, parseRoster } from "@/lib/roster";

export async function POST(request: Request) {
  const body = await request.json();
  const { teacherName, operationTypes, durationMinutes, app } = body;

  if (!teacherName || typeof teacherName !== "string" || teacherName.trim().length < 2) {
    return NextResponse.json({ error: "Nombre del profesor requerido" }, { status: 400 });
  }

  const nameMode = isValidNameMode(body.nameMode) ? body.nameMode : "free";
  const roster = nameMode === "roster" ? parseRoster(body.roster) : [];

  if (nameMode === "roster" && roster.length === 0) {
    return NextResponse.json(
      { error: "La lista de nombres está vacía" },
      { status: 400 },
    );
  }

  const minutes = Math.min(Math.max(Number(durationMinutes) || 90, 15), 480);

  let code = generateCode();
  let attempts = 0;

  while (attempts < 10) {
    const { data: existing } = await supabase
      .from("classroom_sessions")
      .select("id")
      .eq("code", code)
      .eq("active", true)
      .single();

    if (!existing) break;
    code = generateCode();
    attempts++;
  }

  const expiresAt = new Date(Date.now() + minutes * 60 * 1000).toISOString();

  const operations = parseOperationTypes(operationTypes);

  const { data, error } = await supabase
    .from("classroom_sessions")
    .insert({
      code,
      teacher_name: teacherName.trim(),
      // `operation_type` (string único) se mantiene por retrocompatibilidad.
      operation_type: operations[0] || null,
      operation_types: operations,
      app: isValidApp(app) ? app : null,
      name_mode: nameMode,
      roster,
      expires_at: expiresAt,
    })
    .select("code, monitor_token")
    .single();

  if (error) {
    return NextResponse.json({ error: "Error creando sesión" }, { status: 500 });
  }

  return NextResponse.json({
    code: data.code,
    monitorToken: data.monitor_token,
  });
}
