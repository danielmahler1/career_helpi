import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import React from "react";

interface ResultsModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  result: string;
  resetQuiz: () => void;
}

interface Job {
  title: string;
  summary: string;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ isOpen, setIsOpen, result, resetQuiz }) => {
  let parsedResult;
  try {
    parsedResult = result && typeof result === "string" ? JSON.parse(result) : result;
  } catch (error) {
    console.error("Failed to parse results:", error);
    parsedResult = {};
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-4 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg max-w-lg shadow-xl cursor-default relative"
          >
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiCheckCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">Career Advice</h3>
              <p className="text-center mb-6">Recommended Job: {parsedResult.recommended_job}</p>
              <p className="text-center mb-6">Job Summary: {parsedResult.job_summary}</p>
              <div>
                <h4 className="text-center font-bold mb-2">Other Jobs:</h4>
                <ul>
                  {parsedResult.other_jobs.map((job: Job) => (
                    <li key={job.title}>
                      {job.title} - {job.summary}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={resetQuiz} className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded">
                  Restart Quiz
                </button>
                <button type="button" onClick={() => setIsOpen(false)} className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultsModal;
