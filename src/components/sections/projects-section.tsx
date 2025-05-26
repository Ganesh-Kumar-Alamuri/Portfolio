import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Project {
   id: number;
   title: string;
   description: string;
   techStack: string[];
   link?: string;
   liveLink?: string;
   deployment: string;
}

const projects: Project[] = [
   {
      id: 1,
      title: "AGK Store",
      description:
         "A full-featured e-commerce platform with user authentication, product management, and payment processing using Stripe.",
      techStack: ["Next.js", "Stripe", "Prisma", "Clerk", "Tailwind CSS"],
      link: "https://github.com/Ganesh-Kumar-Alamuri/agk-store-nextjs",
      liveLink: "https://agk-store-nextjs.vercel.app",
      deployment: "Vercel",
   },
   {
      id: 2,
      title: "The Placement Park",
      description:
         "A comprehensive CRM & ATS solution for placement departments. Manages student profiles, job listings, and application tracking.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Redux"],
      link: "https://github.com/Ganesh-Kumar-Alamuri/the-placement-park",
      liveLink: "",
      deployment: "Render",
   },
   {
      id: 3,
      title: "AI-Powered Dating Bio Generator",
      description:
         "An AI-powered dating profile generator that helps users create witty and personalized bios using Google's Gemini models. Built with a modern React (Vite) frontend and Express backend.",
      techStack: [
         "React (Vite)",
         "Material UI",
         "Node.js",
         "Express",
         "Gemini API",
         "Axios",
         "dotenv",
      ],
      link: "https://github.com/Ganesh-Kumar-Alamuri/DatingSite",
      liveLink: "https://dinder-app-gjpv.onrender.com",
      deployment: "Render",
   },
];

const ProjectsSection = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true);
               observer.unobserve(entry.target);
            }
         },
         { threshold: 0.1 }
      );

      if (sectionRef.current) {
         observer.observe(sectionRef.current);
      }

      return () => {
         if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
         }
      };
   }, []);

   return (
      <section
         id="projects"
         ref={sectionRef}
         className="py-20 md:py-24 relative"
      >
         <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-12 text-center">
               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Projects
               </h2>
               <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                  Here are some projects I've built that showcase my skills and
                  expertise.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {projects.map((project, index) => (
                  <Card
                     key={project.id}
                     className={`overflow-hidden transition-all duration-700 transform ${
                        isVisible
                           ? "translate-y-0 opacity-100"
                           : index % 2 === 0
                           ? "translate-y-20 opacity-0"
                           : "translate-y-20 opacity-0"
                     } delay-${index * 150}`}
                  >
                     <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>
                           Deployed on {project.deployment}
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <p className="mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                           {project.techStack.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                 {tech}
                              </Badge>
                           ))}
                        </div>
                     </CardContent>
                     <CardFooter>
                        {project.link && (
                           <Button variant="outline" size="sm" asChild>
                              <a
                                 href={project.link}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center gap-1"
                              >
                                 View Code{" "}
                                 <ExternalLink className="ml-1 h-3 w-3" />
                              </a>
                           </Button>
                        )}
                        {project.liveLink && (
                           <Button variant="outline" size="sm" asChild>
                              <a
                                 href={project.liveLink}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center gap-1"
                              >
                                 Live Site{" "}
                                 <ExternalLink className="ml-1 h-3 w-3" />
                              </a>
                           </Button>
                        )}
                     </CardFooter>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
};

export default ProjectsSection;
