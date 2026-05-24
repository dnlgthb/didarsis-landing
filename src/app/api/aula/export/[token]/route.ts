import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const { data: session } = await supabase
    .from("classroom_sessions")
    .select("id, code, teacher_name, operation_type, created_at")
    .eq("monitor_token", token)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Sesión no encontrada" }, { status: 404 });
  }

  const { data: students } = await supabase
    .from("session_students")
    .select("student_name, completed, errors, max_streak, coins, joined_at, last_active_at")
    .eq("session_id", session.id)
    .order("student_name", { ascending: true });

  const BOM = "﻿";
  const header = "Estudiante,Resueltos,Errores,Precisión,Racha Máx,Monedas,Ingresó,Última Actividad";
  const rows = (students || []).map((s) => {
    const total = s.completed + s.errors;
    const accuracy = total > 0 ? Math.round((s.completed / total) * 100) : 0;
    const joined = new Date(s.joined_at).toLocaleString("es-CL");
    const lastActive = new Date(s.last_active_at).toLocaleString("es-CL");
    return `"${s.student_name}",${s.completed},${s.errors},${accuracy}%,${s.max_streak},${s.coins},"${joined}","${lastActive}"`;
  });

  const csv = BOM + header + "\n" + rows.join("\n");
  const filename = `sesion_${session.code}_${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
