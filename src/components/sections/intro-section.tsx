import { useEffect, useState } from "react";

const ReferralPopup = () => {
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const hasSeenPopup = localStorage.getItem("referralPopupShown");

      if (!hasSeenPopup) {
         const timer = setTimeout(() => {
            setVisible(true);
            localStorage.setItem("referralPopupShown", "true");
         }, 10000); // 10 seconds

         return () => clearTimeout(timer); // Cleanup
      }
   }, []);

   if (!visible) return null;

   return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
         <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center relative animate-fade-in">
            <button
               onClick={() => setVisible(false)}
               className="absolute top-2 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 text-xl"
            >
               &times;
            </button>
            <h2 className="text-xl font-semibold mb-2">
               👋 Welcome to my portfolio!
            </h2>
            <p className="mb-4">
               I'm currently exploring new roles. If you know of any openings,
               please check my{" "}
               <a
                  href="/resume.pdf"
                  className="text-blue-600 hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  resume
               </a>{" "}
               and consider referring me. Thank you!
            </p>
            <button
               onClick={() => setVisible(false)}
               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
               Got it
            </button>
         </div>
      </div>
   );
};

export default ReferralPopup;
