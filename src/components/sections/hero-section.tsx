import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Github, Linkedin, FileUser } from "lucide-react";
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

const HeroSection = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const fullName = 'Ganesh Kumar Alamuri';
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (displayName.length < fullName.length) {
        setDisplayName(fullName.substring(0, displayName.length + 1));
      } else {
        setTypingComplete(true);
      }
    }, 100);

    return () => clearTimeout(typingTimer);
  }, [displayName, fullName]);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
     <section
        ref={sectionRef}
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center"
     >
        <div
           className={cn(
              "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]",
              theme === "dark"
                 ? "from-gray-900 via-gray-950 to-black"
                 : "from-white via-gray-100 to-gray-200"
           )}
        />

        <div className="container px-4 md:px-6 text-center space-y-10">
           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter relative inline-block">
              <span className="relative z-10">{displayName}</span>
              <span
                 className={cn(
                    "inline-block w-1 h-10 md:h-12 bg-primary ml-1 animate-blink",
                    typingComplete && "opacity-0"
                 )}
              ></span>
           </h1>

           <div
              className={cn(
                 "space-y-4 transition-opacity duration-1000",
                 typingComplete ? "opacity-100" : "opacity-0"
              )}
           >
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-primary">
                 Fullstack Developer | MERN Specialist & AI Enthusiast
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                 Building scalable, secure, and user-focused web applications
              </p>

              <div className="flex gap-4 justify-center mt-8">
                 <Button size="lg" onClick={scrollToProjects} className="group">
                    View My Work
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                 </Button>

                 <div className="flex gap-2 items-center">
                    <Button size="icon" variant="outline" asChild>
                       <a
                          href="https://github.com/Ganesh-Kumar-Alamuri"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                       >
                          <Github className="h-5 w-5" />
                       </a>
                    </Button>
                    <Button size="icon" variant="outline" asChild>
                       <a
                          href="https://www.linkedin.com/in/ganeshkumaralamuri/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                       >
                          <Linkedin className="h-5 w-5" />
                       </a>
                    </Button>
                    <Button size="icon" variant="outline" asChild>
                       <a
                          href="https://drive.google.com/file/d/14KGwNt03fUZhBq9w6woWd9eXiaEeN9Ki/view?usp=drive_link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                       >
                          <FileUser className="h-5 w-5" />
                       </a>
                    </Button>
                 </div>
              </div>
           </div>
        </div>
     </section>
  );
};

export default HeroSection;