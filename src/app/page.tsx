import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Aproba } from "@/components/Aproba";
import { Apps } from "@/components/Apps";
import { Aula } from "@/components/Aula";
import { Sobre } from "@/components/Sobre";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Aproba />
        <Apps />
        <Aula />
        <Sobre />
      </main>
      <Footer />
    </>
  );
}
