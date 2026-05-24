"use client";

import { useEffect, useState, useCallback, use } from "react";
import { Logo } from "@/components/Logo";

interface Student {
  id: string;
  student_name: string;
  completed: number;
  errors: number;
  max_streak: number;
  coins: number;
  joined_at: string;
  last_active_at: string;
}

interface SessionData {
  session: {
    code: string;
    teacherName: string;
    operationType: string | null;
    active: boolean;
    createdAt: string;
    expiresAt: string;
  };
  students: Student[];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "ahora";
  if (minutes < 60) return `hace ${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `hace ${hours}h`;
}

const OP_LABELS: Record<string, string> = {
  suma: "Suma",
  resta: "Resta",
  multi: "Multiplicación",
  div: "División",
};

export default function MonitorPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [data, setData] = useState<SessionData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/aula/monitor/${token}`);
      if (!res.ok) {
        throw new Error("Sesión no encontrada");
      }
      const json = await res.json();
      setData(json);
      setError("");
    } catch {
      setError("No se pudo cargar la sesión");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-warm flex items-center justify-center">
        <p className="text-ink-secondary">Cargando sesión...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-bg-warm flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-primary text-lg mb-2">
            {error || "Sesión no encontrada"}
          </p>
          <a href="/aula" className="text-brand-primary text-sm hover:underline">
            Crear nueva sesión
          </a>
        </div>
      </div>
    );
  }

  const { session, students } = data;
  const totalCompleted = students.reduce((s, st) => s + st.completed, 0);
  const totalErrors = students.reduce((s, st) => s + st.errors, 0);
  const accuracy =
    totalCompleted + totalErrors > 0
      ? Math.round((totalCompleted / (totalCompleted + totalErrors)) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-bg-warm">
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-ink-secondary">
              {session.teacherName}
            </span>
            <span className="rounded-lg bg-brand-primary/10 px-3 py-1 text-sm font-medium text-brand-primary tracking-wider">
              {session.code}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <h1 className="text-xl font-medium text-ink-primary">
            Panel de Monitoreo
          </h1>
          {session.operationType && (
            <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">
              {OP_LABELS[session.operationType] || session.operationType}
            </span>
          )}
          <div className="ml-auto flex items-center gap-3">
            <a
              href={`/api/aula/export/${token}`}
              download
              className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink-primary hover:bg-black/[0.02] transition-colors"
            >
              Descargar Datos
            </a>
            <span className="text-xs text-ink-secondary/60">
              Actualización cada 5s
            </span>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-sm border border-black/5">
            <p className="text-xs text-ink-secondary mb-1">Estudiantes</p>
            <p className="text-2xl font-medium text-ink-primary">
              {students.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-black/5">
            <p className="text-xs text-ink-secondary mb-1">Resueltos</p>
            <p className="text-2xl font-medium text-ink-primary">
              {totalCompleted}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-black/5">
            <p className="text-xs text-ink-secondary mb-1">Errores</p>
            <p className="text-2xl font-medium text-ink-primary">
              {totalErrors}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-black/5">
            <p className="text-xs text-ink-secondary mb-1">Precisión</p>
            <p className="text-2xl font-medium text-ink-primary">{accuracy}%</p>
          </div>
        </div>

        {/* Students table */}
        {students.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm border border-black/5">
            <p className="text-ink-secondary mb-2">
              Esperando estudiantes...
            </p>
            <p className="text-sm text-ink-secondary/60">
              Los estudiantes deben abrir Numera+ e ingresar el código{" "}
              <strong className="text-brand-primary tracking-wider">
                {session.code}
              </strong>
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm border border-black/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 text-left">
                  <th className="px-4 py-3 font-medium text-ink-secondary">
                    Estudiante
                  </th>
                  <th className="px-4 py-3 font-medium text-ink-secondary text-center">
                    Resueltos
                  </th>
                  <th className="px-4 py-3 font-medium text-ink-secondary text-center">
                    Errores
                  </th>
                  <th className="px-4 py-3 font-medium text-ink-secondary text-center hidden sm:table-cell">
                    Racha Máx
                  </th>
                  <th className="px-4 py-3 font-medium text-ink-secondary text-center hidden sm:table-cell">
                    Monedas
                  </th>
                  <th className="px-4 py-3 font-medium text-ink-secondary text-right">
                    Última actividad
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const total = student.completed + student.errors;
                  const studentAccuracy =
                    total > 0
                      ? Math.round((student.completed / total) * 100)
                      : 0;
                  const isActive =
                    Date.now() - new Date(student.last_active_at).getTime() <
                    120000;

                  return (
                    <tr
                      key={student.id}
                      className="border-b border-black/5 last:border-0"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${isActive ? "bg-green-400" : "bg-gray-300"}`}
                          />
                          <span className="text-ink-primary">
                            {student.student_name}
                          </span>
                          {total > 0 && (
                            <span className="text-xs text-ink-secondary/50">
                              {studentAccuracy}%
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-ink-primary">
                        {student.completed}
                      </td>
                      <td className="px-4 py-3 text-center text-ink-primary">
                        {student.errors}
                      </td>
                      <td className="px-4 py-3 text-center text-ink-primary hidden sm:table-cell">
                        {student.max_streak}
                      </td>
                      <td className="px-4 py-3 text-center text-ink-primary hidden sm:table-cell">
                        {student.coins}
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-ink-secondary">
                        {timeAgo(student.last_active_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
