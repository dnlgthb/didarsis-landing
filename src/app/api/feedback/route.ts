import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const { comment, website } = (body ?? {}) as {
    comment?: unknown;
    website?: unknown;
  };

  // Honeypot: los bots que rellenan todo caen aquí — éxito falso, sin guardar.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof comment !== "string" || comment.trim().length < 4) {
    return NextResponse.json(
      { error: "Escribe un comentario un poco más largo" },
      { status: 400 },
    );
  }

  const text = comment.trim();
  if (text.length > 2000) {
    return NextResponse.json(
      { error: "El comentario es demasiado largo" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("app_feedback").insert({ comment: text });

  if (error) {
    console.error("Error guardando feedback:", error);
    return NextResponse.json(
      { error: "No se pudo guardar tu comentario" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
