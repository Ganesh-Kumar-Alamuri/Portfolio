import { useRef, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";


const formSchema = z.object({
   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
   email: z.string().email({ message: "Please enter a valid email address." }),
   message: z.string().min(5, { message: "Message must be at least 5 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const [isVisible, setIsVisible] = useState(false);
   const { toast } = useToast();

   useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
         if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
         }
      }, { threshold: 0.1 });

      if (sectionRef.current) observer.observe(sectionRef.current);

      return () => {
         if (sectionRef.current) observer.unobserve(sectionRef.current);
      };
   }, []);

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         email: "",
         message: "",
      },
   });

   function onSubmit(data: FormValues) {
      emailjs.send(
         import.meta.env.VITE_EMAILJS_SERVICE_ID,
         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
         {
           name: data.name,
            email: data.email,
            message: data.message,
         },
         import.meta.env.VITE_EMAILJS_PUBLIC_KEY
         ).then(() => {
            toast({
               title: "Message sent!",
               description: "Thanks for reaching out. I'll get back to you soon.",
            });
            form.reset();
         })
         .catch((error) => {
            console.error("Email sending failed:", error);
            toast({
               title: "Error",
               description: "Something went wrong. Please try again later.",
               variant: "destructive",
            });
         });
   }

   return (
      <section id="contact" ref={sectionRef} className="py-20 md:py-24 relative">
         <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-12 text-center">
               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Contact Me</h2>
               <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                  Get in touch for collaborations, opportunities, or just to say hello!
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               <Card
                  className={`transition-all duration-700 transform ${
                     isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
                  }`}
               >
                  <CardContent className="p-6">
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                           <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                       <Input placeholder="Your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                       <Input placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="message"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                       <Textarea placeholder="Your message..." className="min-h-[120px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <Button type="submit" className="w-full">
                              Send Message <Send className="ml-2 h-4 w-4" />
                           </Button>
                        </form>
                     </Form>
                  </CardContent>
               </Card>

               <div
                  className={`space-y-8 transition-all duration-700 transform ${
                     isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                  }`}
               >
                  <div className="space-y-4">
                     <h3 className="text-xl font-semibold">Contact Details</h3>
                     <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                           <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <a href="mailto:alamuriganeshkumar2606@gmail.com" className="hover:text-primary transition-colors">
                           alamuriganeshkumar2606@gmail.com
                        </a>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                           <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <a href="tel:+919398729624" className="hover:text-primary transition-colors">
                           +91-9398729624
                        </a>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-xl font-semibold">Connect With Me</h3>
                     <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                           <Linkedin className="h-5 w-5 text-primary" />
                        </div>
                        <a href="https://www.linkedin.com/in/ganeshkumaralamuri/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                           linkedin.com/in/ganeshkumaralamuri
                        </a>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                           <Github className="h-5 w-5 text-primary" />
                        </div>
                        <a href="https://github.com/Ganesh-Kumar-Alamuri" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                           github.com/Ganesh-Kumar-Alamuri
                        </a>
                     </div>
                  </div>

                  <div className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/10">
                     <h4 className="font-medium mb-2">Let's work together!</h4>
                     <p className="text-muted-foreground">
                        I'm currently open to new opportunities and interesting projects. Feel free to reach out and I'll get back to you as soon as possible.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ContactSection;
