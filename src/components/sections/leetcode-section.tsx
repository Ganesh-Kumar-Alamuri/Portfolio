import { useRef, useEffect, useState } from "react";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, Trophy, Code, ExternalLink } from "lucide-react";

const LeetcodeSection = () => {
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
         id="leetcode"
         ref={sectionRef}
         className="py-20 md:py-24 bg-primary/5"
      >
         <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-12 text-center">
               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  DSA Journey
               </h2>
               <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                  My competitive programming stats and achievements.
               </p>
            </div>

            <div className="max-w-4xl mx-auto">
               <Card
                  className={`transition-all duration-700 transform ${
                     isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-20 opacity-0"
                  }`}
               >
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-yellow-500" />
                        LeetCode Profile
                     </CardTitle>
                     <CardDescription>
                        A summary of my problem-solving journey
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-4 rounded-lg bg-card/60">
                           <Badge variant="outline" className="mb-2 px-3">
                              Max-Rating
                           </Badge>
                           <span className="text-3xl font-bold text-yellow-500">
                              1670
                           </span>
                        </div>

                        <div className="flex flex-col items-center p-4 rounded-lg bg-card/60">
                           <Badge variant="outline" className="mb-2 px-3">
                              Problems Solved OverAll
                           </Badge>
                           <span className="text-3xl font-bold">250+</span>
                        </div>

                        <div className="flex flex-col items-center p-4 rounded-lg bg-card/60">
                           <Badge variant="outline" className="mb-2 px-3">
                              Streak
                           </Badge>
                           <span className="text-3xl font-bold text-green-500">
                              30+ days
                           </span>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">
                           Focus Areas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                           <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Dynamic Programming
                           </Badge>
                           <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Graph Algorithms
                           </Badge>
                           <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                              Binary Search
                           </Badge>
                           <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                              Data Structures
                           </Badge>
                        </div>
                     </div>

                     <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                           <CircleCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                           <span>
                              Solved 250+ problems across LeetCode and
                              HackerRank
                           </span>
                        </li>
                        <li className="flex items-start gap-2">
                           <CircleCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                           <span>Achieved maximum LeetCode rating of 1670</span>
                        </li>
                        <li className="flex items-start gap-2">
                           <CircleCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                           <span>Participated in 10+ coding contests</span>
                        </li>
                     </ul>

                     <div className="flex justify-center pt-4">
                        <Button asChild>
                           <a
                              href="https://leetcode.com/u/alamuriganeshkumar"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                           >
                              <Code className="h-4 w-4" />
                              View LeetCode Profile
                              <ExternalLink className="h-3 w-3" />
                           </a>
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </section>
   );
};

export default LeetcodeSection;
