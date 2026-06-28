-- Operaciones objetivo de la sesión (varias por sesión).
-- El profesor puede pedir practicar una o más operaciones; en clase, solo esas
-- otorgan puntos en Numera. Vacío = uso libre (cualquier operación cuenta).
-- Ejecutar una vez en el SQL Editor de Supabase.
--
-- Reemplaza al antiguo `operation_type` (string único), que se mantiene por
-- retrocompatibilidad con builds y apps anteriores.

alter table classroom_sessions
  add column if not exists operation_types text[] not null default '{}'::text[];
