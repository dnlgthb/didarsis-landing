import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://didarsis.com"),
  title: "Didarsis · Educación que mueve.",
  description:
    "Tecnología educativa para docentes y estudiantes. Plataforma profesional y apps de práctica para el aula.",
  openGraph: {
    title: "Didarsis · Educación que mueve.",
    description:
      "Tecnología educativa para docentes y estudiantes. Plataforma profesional y apps de práctica para el aula.",
    type: "website",
    locale: "es_CL",
    siteName: "Didarsis",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
