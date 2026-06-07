import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("app_feedback")
    .select("comment, created_at")
    .gte("created_at", since)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error consultando feedback:", error);
    return NextResponse.json(
      { error: "Error consultando feedback" },
      { status: 500 },
    );
  }

  const count = data?.length ?? 0;
  if (count === 0) {
    return NextResponse.json({ sent: false, count: 0 });
  }

  const items = data!
    .map(
      (r) =>
        `<li style="margin-bottom:12px"><small style="color:#4A3460">${new Date(
          r.created_at,
        ).toLocaleDateString("es-CL")}</small><br>${escapeHtml(r.comment)}</li>`,
    )
    .join("");
  const html = `
    <div style="font-family:sans-serif;color:#1F0040">
      <h2>Resumen de la semana — ${count} comentario${count === 1 ? "" : "s"}</h2>
      <p>Ideas de contenido gamificado dejadas en didarsis.com:</p>
      <ul>${items}</ul>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Didarsis <resumen@aproba.ai>",
      to: process.env.DIGEST_EMAIL,
      subject: `Didarsis · ${count} comentario${count === 1 ? "" : "s"} esta semana`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Error enviando correo:", res.status, await res.text());
    return NextResponse.json({ error: "Error enviando correo" }, { status: 502 });
  }

  return NextResponse.json({ sent: true, count });
}
