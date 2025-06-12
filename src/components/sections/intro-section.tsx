import { useEffect, useState } from "react";
import { useTheme } from "../theme-provider";
import { ArrowDownToLine, ExternalLink } from "lucide-react";
const ReferralPopup = () => {
   const [visible, setVisible] = useState(false);
   const { theme } = useTheme();

   useEffect(() => {
      const hasSeenPopup = localStorage.getItem("referralPopupShown");

      if (!hasSeenPopup) {
         const timer = setTimeout(() => {
            setVisible(true);
            localStorage.setItem("referralPopupShown", "true");
         }, 5000); // 10 seconds

         return () => clearTimeout(timer); // Cleanup
      }
   }, []);

   if (!visible) return null;

   return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
         <div
            className={`bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
              ${
                 theme === "dark"
                    ? "from-gray-900 via-gray-950 to-black/15"
                    : "from-white via-gray-100 to-gray-200"
              } text-gray-900 dark:text-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center relative animate-fade-in border-gray-50 border-2`}
         >
            <button
               onClick={() => setVisible(false)}
               className="absolute top-2 right-3 text-white hover:text-gray-800 dark:hover:text-gray-300 text-xl"
            >
               &times;
            </button>
            <h2 className="text-xl font-semibold mb-2">
               👋 Welcome to my Portfolio!
            </h2>
            <p className="mb-4">
               I'm currently exploring new roles. If you know of any openings,
               please check my{" "}
               <a
                  href="https://tinyurl.com/agk-resume"
                  className="text-blue-600 hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  resume
               </a>{" "}
               and consider referring me. Thank you!
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-between ">
               {/* Online URL Button */}
               <a
                  href="https://tinyurl.com/agk-resume"
                  className="flex items-center justify-center gap-2 w-full md:w-[48%] bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setVisible(false)}
               >
                  <ExternalLink className="w-5 h-5 sm:w-4 sm:h-4" />
                  <h4 className="font-medium text-base sm:text-sm">
                     OnlineURL
                  </h4>
               </a>

               {/* Download Button */}
               <a
                  href="Ganesh Kumar Alamuri Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full md:w-[48%] bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  download="Ganesh Kumar Alamuri Resume.pdf"
                  onClick={() => setVisible(false)}
               >
                  <ArrowDownToLine className="w-5 h-5 sm:w-4 sm:h-4" />
                  <h4 className="font-medium text-base sm:text-sm">Download</h4>
               </a>
            </div>
         </div>
      </div>
   );
};

export default ReferralPopup;
