import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Skill {
   name: string;
   type: "Frontend" | "Backend" | "Language" | "Tool" | "Database";
   proficiency: "Beginner" | "Intermediate" | "Proficient" | "Expert";
}

const skills: Skill[] = [
   // Languages
   { name: "JavaScript", type: "Language", proficiency: "Proficient" },
   { name: "TypeScript", type: "Language", proficiency: "Proficient" },
   { name: "Core Java", type: "Language", proficiency: "Proficient" },
   { name: "Python", type: "Language", proficiency: "Proficient" },
   { name: "C/C++", type: "Language", proficiency: "Intermediate" },

   // Frontend
   { name: "React.js", type: "Frontend", proficiency: "Expert" },
   { name: "Next.js", type: "Frontend", proficiency: "Intermediate" },
   { name: "Redux Toolkit", type: "Frontend", proficiency: "Proficient" },
   { name: "Zustand", type: "Frontend", proficiency: "Proficient" },
   { name: "Tailwind CSS", type: "Frontend", proficiency: "Expert" },
   { name: "Material UI", type: "Frontend", proficiency: "Proficient" },
   { name: "Daisy UI", type: "Frontend", proficiency: "Proficient" },
   { name: "Shadcn/ui", type: "Frontend", proficiency: "Proficient" },
   { name: "React Router", type: "Frontend", proficiency: "Proficient" },
   { name: "Socket.IO", type: "Frontend", proficiency: "Intermediate" },

   // Backend
   { name: "Node.js", type: "Backend", proficiency: "Proficient" },
   { name: "Express.js", type: "Backend", proficiency: "Proficient" },
   { name: "Prisma", type: "Backend", proficiency: "Intermediate" },

   // Database
   { name: "MongoDB", type: "Database", proficiency: "Proficient" },
   { name: "MySQL", type: "Database", proficiency: "Proficient" },

   // Tools
   { name: "Git", type: "Tool", proficiency: "Proficient" },
   { name: "GitHub", type: "Tool", proficiency: "Proficient" },
   { name: "Vercel", type: "Tool", proficiency: "Proficient" },
   { name: "Render", type: "Tool", proficiency: "Intermediate" },
   { name: "Jest", type: "Tool", proficiency: "Beginner" },
   //  { name: "Agile", type: "Tool", proficiency: "Proficient" },
];

const getTypeColor = (type: Skill["type"]) => {
   switch (type) {
      case "Frontend":
         return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
      case "Backend":
         return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "Language":
         return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Tool":
         return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "Database":
         return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300";
      default:
         return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
   }
};

const getProficiencyColor = (proficiency: Skill["proficiency"]) => {
   switch (proficiency) {
      case "Beginner":
         return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Intermediate":
         return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Proficient":
         return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Expert":
         return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
         return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
   }
};

const SkillsSection = () => {
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

   // Group skills by type
   const skillsByType = skills.reduce((acc, skill) => {
      if (!acc[skill.type]) {
         acc[skill.type] = [];
      }
      acc[skill.type].push(skill);
      return acc;
   }, {} as Record<Skill["type"], Skill[]>);

   // Order of skill types
   const typeOrder: Skill["type"][] = [
      "Language",
      "Frontend",
      "Backend",
      "Database",
      "Tool",
   ];

   return (
      <section
         id="skills"
         ref={sectionRef}
         className="py-20 md:py-24 bg-secondary/5"
      >
         <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-12 text-center">
               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Tech Skills
               </h2>
               <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                  Technologies and tools I specialize in for building modern web
                  applications.
               </p>
            </div>

            {typeOrder.map((type) => (
               <div key={type} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{type}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                     {skillsByType[type]?.map((skill, index) => (
                        <Card
                           key={skill.name}
                           className={cn(
                              "transition-all duration-500 transform",
                              isVisible
                                 ? "translate-y-0 opacity-100"
                                 : "translate-y-10 opacity-0",
                              `delay-[${index * 50}ms]`
                           )}
                        >
                           <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                 {skill.name}
                              </CardTitle>
                           </CardHeader>
                           <CardContent>
                              <div className="flex flex-wrap gap-2">
                                 <Badge className={getTypeColor(skill.type)}>
                                    {skill.type}
                                 </Badge>
                                 <Badge
                                    className={getProficiencyColor(
                                       skill.proficiency
                                    )}
                                 >
                                    {skill.proficiency}
                                 </Badge>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
};

export default SkillsSection;
