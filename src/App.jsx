import "./theme.css";
import "./App.css";
import useTheme from "./hooks/useTheme";
import useScrollSetup from "./hooks/useScrollSetup";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import FlagshipCaseStudy from "./components/FlagshipCaseStudy";
import About from "./components/About";
import ExperienceAccordion from "./components/ExperienceAccordion";
import Skills from "./components/Skills";
import CaseStudies from "./components/CaseStudies";
import GitHubPanel from "./components/GitHubPanel";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { dark, toggle } = useTheme();
  useScrollSetup();

  return (
    <>
      <Header dark={dark} onToggleTheme={toggle} />
      <main>
        <Hero />
        <StatsBar />
        <FlagshipCaseStudy />
        <About />
        <ExperienceAccordion />
        <Skills />
        <CaseStudies />
        <GitHubPanel />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
