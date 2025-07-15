import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, FileUser } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

const DOTS_COUNT = 60;
const DOT_RADIUS = 2.5;
const DOT_MOVE_STRENGTH = 0.12;

const HeroSection = () => {
   const [typingComplete, setTypingComplete] = useState(false);
   const [displayName, setDisplayName] = useState("");
   const fullName = "Ganesh Kumar Alamuri";
   const sectionRef = useRef<HTMLElement>(null);
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const dotsRef = useRef<{ x: number; y: number }[]>([]);
   const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
   const mouse = useRef({ x: 0, y: 0 });
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

   const initialDotsRef = useRef<{ x: number; y: number }[]>([]);

   useEffect(() => {
      const width = canvasSize.width || 800;
      const height = canvasSize.height || 400;
      const newDots = Array.from({ length: DOTS_COUNT }, () => ({
         x: Math.random() * width,
         y: Math.random() * height,
      }));
      dotsRef.current = newDots.map(dot => ({ ...dot }));
      initialDotsRef.current = newDots.map(dot => ({ ...dot }));
      mouse.current.x = width / 2;
      mouse.current.y = height / 2;
   }, [canvasSize.width, canvasSize.height]);

   useEffect(() => {
      let resizeObserver: ResizeObserver | null = null;
      const updateSize = () => {
         if (sectionRef.current) {
            setCanvasSize({
               width: sectionRef.current.offsetWidth,
               height: sectionRef.current.offsetHeight,
            });
         }
      };
      const timeoutId = setTimeout(updateSize, 100);
      if (sectionRef.current && 'ResizeObserver' in window) {
         resizeObserver = new ResizeObserver(updateSize);
         resizeObserver.observe(sectionRef.current);
      } else {
         window.addEventListener("resize", updateSize);
      }
      return () => {
         clearTimeout(timeoutId);
         if (resizeObserver && sectionRef.current) resizeObserver.unobserve(sectionRef.current);
         window.removeEventListener("resize", updateSize);
      };
   }, []);

   const getTextExclusionZone = () => {
      if (!sectionRef.current) return null;
      const textDiv = sectionRef.current.querySelector('.hero-safe-zone') as HTMLElement;
      if (!textDiv) return null;
      const rect = textDiv.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const padding = 24;
      return {
         left: rect.left - sectionRect.left + padding,
         top: rect.top - sectionRect.top + padding,
         right: rect.right - sectionRect.left - padding,
         bottom: rect.bottom - sectionRect.top - padding,
      };
   };

   useEffect(() => {
      let animationId: number;
      const animate = () => {
         const ctx = canvasRef.current?.getContext("2d");
         if (!ctx || !canvasRef.current) return;
         ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
         dotsRef.current.forEach((dot, i) => {
            const initial = initialDotsRef.current[i];
            const dx = mouse.current.x - initial.x;
            const dy = mouse.current.y - initial.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let moveX = 0, moveY = 0;
            const exclusion = getTextExclusionZone();
            if (exclusion &&
               dot.x > exclusion.left && dot.x < exclusion.right &&
               dot.y > exclusion.top && dot.y < exclusion.bottom) {
               return;
            }
            if (dist < 120 && dist > 0) {
               const maxMove = 15;
               const targetX = initial.x + Math.max(Math.min(dx, maxMove), -maxMove);
               const targetY = initial.y + Math.max(Math.min(dy, maxMove), -maxMove);
               moveX = (targetX - dot.x) * DOT_MOVE_STRENGTH;
               moveY = (targetY - dot.y) * DOT_MOVE_STRENGTH;
            } else {
               moveX = (initial.x - dot.x) * DOT_MOVE_STRENGTH * 0.5;
               moveY = (initial.y - dot.y) * DOT_MOVE_STRENGTH * 0.5;
            }
            dot.x += moveX;
            dot.y += moveY;
            ctx.save();
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, 2 * Math.PI);
            if (theme === "dark") {
               ctx.shadowColor = "#fff";
               ctx.shadowBlur = 8;
               ctx.fillStyle = "#fff";
               ctx.globalAlpha = 0.7;
            } else {
               ctx.shadowColor = "#38bdf8";
               ctx.shadowBlur = 6;
               ctx.fillStyle = "#38bdf8";
               ctx.globalAlpha = 0.5;
            }
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.restore();
         });
         animationId = requestAnimationFrame(animate);
      };
      animate();
      return () => cancelAnimationFrame(animationId);
   }, [canvasSize.width, canvasSize.height, theme]);

   useEffect(() => {
      const handleMove = (e: MouseEvent) => {
         if (!sectionRef.current) return;
         const rect = sectionRef.current.getBoundingClientRect();
         mouse.current.x = e.clientX - rect.left;
         mouse.current.y = e.clientY - rect.top;
      };
      const section = sectionRef.current;
      section?.addEventListener("mousemove", handleMove);
      return () => section?.removeEventListener("mousemove", handleMove);
   }, []);

   const scrollToProjects = () => {
      const projectsSection = document.querySelector("#projects");
      if (projectsSection) {
         projectsSection.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <section
         ref={sectionRef}
         id="home"
         style={{ position: 'relative', width: '100vw' }}
         className={cn(
            "w-screen min-h-screen relative flex flex-col justify-center items-center overflow-hidden transition-colors duration-300",
            theme === "dark"
               ? "bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white"
               : "bg-gradient-to-b from-sky-100 via-yellow-50 to-white text-sky-900"
         )}
      >
         <div
            className={cn(
               "absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] transition-colors duration-300",
               theme === "dark"
                  ? "from-gray-900 via-gray-950 to-black opacity-90"
                  : "from-sky-100 via-yellow-50 to-white opacity-90"
            )}
         />
         <canvas
            ref={canvasRef}
            width={canvasSize.width || 800}
            height={canvasSize.height || 400}
            style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'transparent', pointerEvents: 'none', filter: 'blur(0.5px)' }}
            aria-hidden="true"
         />

         <div className={cn(
            "container px-4 md:px-6 text-center space-y-10 relative z-10 hero-safe-zone transition-colors duration-700",
            theme === "dark" ? "text-white" : "text-sky-900"
         )}>
            <h1 className={cn(
               "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter relative inline-block transition-colors duration-700",
               theme === "dark"
                  ? "text-white drop-shadow-[0_2px_16px_rgba(255,255,200,0.25)]"
                  : "text-sky-900 drop-shadow-[0_2px_16px_rgba(180,210,255,0.2)]"
            )}>
               <span className="relative z-10">{displayName}</span>
               <span
                  className={cn(
                     "inline-block w-1 h-10 md:h-12 ml-1 animate-blink transition-colors duration-700",
                     typingComplete && "opacity-0",
                     theme === "dark" ? "bg-primary" : "bg-sky-500"
                  )}
               ></span>
            </h1>

            <div className={cn(
               "space-y-4 transition-opacity duration-1000 relative z-10 transition-colors duration-700",
               typingComplete ? "opacity-100" : "opacity-0"
            )}>
               <p className={cn(
                  "text-xl sm:text-2xl md:text-3xl font-medium transition-colors duration-700",
                  theme === "dark" ? "text-white" : "text-sky-800"
               )}>
                  Java + MERN Fullstack Developer
               </p>
               <p className={cn(
                  "text-lg max-w-2xl mx-auto transition-colors duration-700",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
               )}>
                  Building scalable, secure, and user-focused web applications
               </p>

               <div className="flex gap-4 justify-center mt-8">
                  <Button
                     size="lg"
                     onClick={scrollToProjects}
                     className={cn(
                        "group transition-colors duration-700",
                        theme === "dark"
                           ? "bg-primary text-white border-none hover:bg-primary/80"
                           : "bg-sky-500 hover:bg-sky-600 text-white border-none"
                     )}
                  >
                     View My Work
                     <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  </Button>

                  <div className="flex gap-2 items-center">
                     <Button size="icon" variant="outline" asChild className={theme === "dark" ? "border-gray-700" : "bg-sky-100 border-sky-300 hover:bg-sky-200"}>
                        <a href="https://github.com/Ganesh-Kumar-Alamuri" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                           <Github className={theme === "dark" ? "text-white" : "text-sky-700"} />
                        </a>
                     </Button>
                     <Button size="icon" variant="outline" asChild className={theme === "dark" ? "border-gray-700" : "bg-sky-100 border-sky-300 hover:bg-sky-200"}>
                        <a href="https://www.linkedin.com/in/ganeshkumaralamuri/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                           <Linkedin className={theme === "dark" ? "text-white" : "text-sky-700"} />
                        </a>
                     </Button>
                     <Button size="icon" variant="outline" asChild className={theme === "dark" ? "border-gray-700" : "bg-sky-100 border-sky-300 hover:bg-sky-200"}>
                        <a href="https://drive.google.com/file/d/1dqEGqV13c787O7VHecWQMA1JyaMgsv3x/view?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="Resume">
                           <FileUser className={theme === "dark" ? "text-white" : "text-sky-700"} />
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
