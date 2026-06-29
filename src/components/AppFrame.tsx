"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Embebe una app de estudiante en un iframe a pantalla completa. Si la URL
// trae ?code=XXXX (deep-link del QR del aula), lo reenvía a la app dentro del
// iframe para que abra el ingreso con el código ya cargado. `src` debe ser la
// ruta interna de la app (que preserva el query), no la raíz que redirige.
function Frame({ src }: { src: string }) {
  const code = useSearchParams().get("code");
  const finalSrc = code ? `${src}?code=${encodeURIComponent(code)}` : src;
  return (
    <iframe
      src={finalSrc}
      className="fixed inset-0 w-full h-full border-0"
      allow="fullscreen"
    />
  );
}

export function AppFrame({ src }: { src: string }) {
  return (
    <Suspense fallback={null}>
      <Frame src={src} />
    </Suspense>
  );
}
