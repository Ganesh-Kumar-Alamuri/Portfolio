import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LearningSkill {
   name: string;
   type: "Frontend" | "Backend" | "DevOps" | "Design" | "Database" | "Testing";
}

const learningSkills: LearningSkill[] = [
   { name: "Java MicroServices", type: "Backend" },
   { name: "React Testing Library", type: "Testing" },
];

const getTypeColor = (type: LearningSkill["type"]) => {
   switch (type) {
      case "Frontend":
         return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300";
      case "Backend":
         return "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300";
      case "DevOps":
         return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
      case "Design":
         return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "Database":
         return "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300";
      case "Testing":
         return "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300";
      default:
         return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
   }
};

const LearningSection = () => {
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
      <section id="learning" ref={sectionRef} className="py-20 md:py-24">
         <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-12 text-center">
               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Currently Learning
               </h2>
               <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                  Technologies I'm currently exploring to expand my skillset.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {learningSkills.map((skill, index) => (
                  <Card
                     key={skill.name}
                     className={cn(
                        "border border-primary/20 transition-all duration-500 transform",
                        isVisible
                           ? "translate-y-0 opacity-100"
                           : "translate-y-10 opacity-0",
                        `delay-[${index * 50}ms]`
                     )}
                  >
                     <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="flex flex-wrap gap-2">
                           <Badge className={getTypeColor(skill.type)}>
                              {skill.type}
                           </Badge>
                           <Badge variant="outline">Learning</Badge>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
};

export default LearningSection;
