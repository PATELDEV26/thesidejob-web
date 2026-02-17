import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import Projects from "@/components/sections/Projects";
import LiveUpdates from "@/components/sections/LiveUpdates";
import Events from "@/components/sections/Events";
import ProjectSubmissionForm from "@/components/sections/ProjectSubmissionForm";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Team />
      <Projects />
      <LiveUpdates />
      <Events />
      <ProjectSubmissionForm />
      <Contact />
    </>
  );
}
