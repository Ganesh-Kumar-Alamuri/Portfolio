import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal, Star, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const achievements = [
   {
      id: 1,
      title: "Earned client commendation for delivering high-quality results and exceeding expectations on a freelance project",
      icon: <Clock className="h-5 w-5" />,
      link: "https://drive.google.com/file/d/1OQGusZbM0QrwcgMeFtGNH_L4kQIyXeiJ/view?usp=drive_link",
   },
   {
      id: 2,
      title: "Recognized with a SPOT Award at Deloitte for delivering high-impact results to clients",
      icon: <Medal className="h-5 w-5" />,
      link: "https://drive.google.com/file/d/1OQvHm4Kvqcz7hrE4mwjkM29GUdm3WbDk/view?usp=drive_link",
   },
   {
      id: 3,
      title: "Completed the Gen AI Frameworks and Tools program at Great Learning, gaining practical expertise in generative AI technologies",
      icon: <CheckCircle className="h-5 w-5" />,
      link: "https://www.mygreatlearning.com/certificate/VOAVNQWO",
   },
   {
      id: 4,
      title: `Deloitte-certified in Data Engineering and Machine Learning, with Google Cloud badges in Looker and BigQuery analytics`,
      icon: <Star className="h-5 w-5" />,
      link: "https://www.credly.com/users/ganesh-alamuri",
   },
];

const AchievementsSection = () => {
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
         id="achievements"
         ref={sectionRef}
         className="py-20 md:py-24 bg-muted/30"
      >
         <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-12 text-center">
               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Achievements / Certifications
               </h2>
               <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                  Key milestones and accomplishments in my professional journey.
               </p>
            </div>

            <div className="max-w-7xl mx-auto">
               <div className="grid sm:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                     <Card
                        key={achievement.id}
                        className={cn(
                           "transition-all duration-500 transform",
                           isVisible
                              ? "translate-y-0 opacity-100"
                              : "translate-y-10 opacity-0",
                           `delay-[${index * 100}ms]`
                        )}
                     >
                        <CardHeader className="pb-2">
                           <CardTitle className="text-lg flex items-center gap-2">
                              <span className="text-primary">
                                 {achievement.icon}
                              </span>
                              <span>Achievement</span>

                              <a
                                 href={achievement.link}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center gap-1"
                              >
                                 <ExternalLink className="ml-1 h-4 w-4" />
                              </a>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p>{achievement.title}</p>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default AchievementsSection;
