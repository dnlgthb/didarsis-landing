import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface ProgressEvent {
  eventType: string;
  operationType: string;
  problemText?: string;
  studentAnswer?: string;
  correctAnswer?: string;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { studentId, events } = body as {
    studentId: string;
    events: ProgressEvent[];
  };

  if (!studentId || !events || !Array.isArray(events) || events.length === 0) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  if (events.length > 50) {
    return NextResponse.json({ error: "Máximo 50 eventos por request" }, { status: 400 });
  }

  const { data: student } = await supabase
    .from("session_students")
    .select("id")
    .eq("id", studentId)
    .single();

  if (!student) {
    return NextResponse.json({ error: "Estudiante no encontrado" }, { status: 404 });
  }

  const rows = events.map((e) => ({
    student_id: studentId,
    event_type: e.eventType,
    operation_type: e.operationType,
    problem_text: e.problemText || null,
    student_answer: e.studentAnswer || null,
    correct_answer: e.correctAnswer || null,
  }));

  const { error: insertError } = await supabase
    .from("progress_events")
    .insert(rows);

  if (insertError) {
    return NextResponse.json({ error: "Error guardando eventos" }, { status: 500 });
  }

  let correctCount = 0;
  let errorCount = 0;
  for (const e of events) {
    if (e.eventType === "correct") correctCount++;
    else if (e.eventType === "error") errorCount++;
  }

  if (correctCount > 0 || errorCount > 0) {
    const { data: current } = await supabase
      .from("session_students")
      .select("completed, errors")
      .eq("id", studentId)
      .single();

    if (current) {
      await supabase
        .from("session_students")
        .update({
          completed: current.completed + correctCount,
          errors: current.errors + errorCount,
          last_active_at: new Date().toISOString(),
        })
        .eq("id", studentId);
    }
  }

  return NextResponse.json({ ok: true });
}
