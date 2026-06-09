-- Lista de nombres (roster) para sesiones de aula.
-- Ejecutar una vez en el SQL Editor de Supabase.

-- Modo de nombre: 'free' (escribe libre) | 'roster' (elige de la lista).
alter table classroom_sessions
  add column if not exists name_mode text not null default 'free';

-- Lista de nombres permitidos. Vacía cuando name_mode = 'free'.
alter table classroom_sessions
  add column if not exists roster jsonb not null default '[]'::jsonb;
