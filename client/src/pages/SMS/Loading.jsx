import { useState, useEffect, useContext } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import NurseDetailsContext from "../../context/NurseDetailsContext";
import PatientDetails from "./PatientDetails";


export default function Component() {
  const [progress, setProgress] = useState(0);
  const { nurseDetails } = useContext(NurseDetailsContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 100 / (20 * 60); // 100% over 20 minutes
      });
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <PatientDetails />
      <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-300 via-green-200 to-pink-300"
            animate={{
              background: [
                "linear-gradient(to right, #93C5FD, #A7F3D0, #FDE68A)",
                "linear-gradient(to right, #FDE68A, #93C5FD, #A7F3D0)",
                "linear-gradient(to right, #A7F3D0, #FDE68A, #93C5FD)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-md p-6 bg-white/80 backdrop-blur-md rounded-lg shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <MessageCircle className="h-16 w-16 text-primary mb-4" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-primary mb-4 text-center"
          >
            Contacting Nurse {nurseDetails.nurse.name}
          </motion.h2>
          <div className="flex justify-center space-x-2 mb-8">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-primary rounded-full"
                initial={{ y: 0 }}
                animate={{ y: [-10, 0, -10] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
          <div
            className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="bg-primary h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-500 text-center">
            Estimated response time: 20 minutes
          </p>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">While you wait:</p>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-gray-500 list-disc list-inside"
            >
              <li>Prepare a list of your symptoms</li>
              <li>Gather any relevant medical history</li>
            </motion.ul>
          </div>
        </div>
      </div>
    </div>
  );
}
