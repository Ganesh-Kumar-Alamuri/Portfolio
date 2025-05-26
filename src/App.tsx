import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/sections/hero-section';
import ProjectsSection from '@/components/sections/projects-section';
import SkillsSection from '@/components/sections/skills-section';
import LearningSection from '@/components/sections/learning-section';
import LeetcodeSection from '@/components/sections/leetcode-section';
import ContactSection from '@/components/sections/contact-section';
import AchievementsSection from './components/sections/achievements-section';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (
          scrollPosition >= sectionTop && 
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar activeSection={activeSection} />
        <main>
          <HeroSection />
          <ProjectsSection />
          <AchievementsSection/>
          <SkillsSection />
          <LearningSection />
          <LeetcodeSection />
          <ContactSection />
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;