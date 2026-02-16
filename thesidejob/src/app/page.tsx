import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Team />
      <Projects />
      <Contact />
    </>
  );
}
