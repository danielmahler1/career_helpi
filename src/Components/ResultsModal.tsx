import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

interface ResultsModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  result: string;  // This should be a plain string or HTML string
  resetQuiz: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ isOpen, setIsOpen, result, resetQuiz }) => {
  // Function to convert plain text to HTML with the first line as a header and the rest as a list
  const convertToHtmlList = (text: string) => {
    const points = text.split('-').filter(p => p.trim() !== ''); // Split by '-' and remove any empty results
    if (points.length > 0) {
      const title = points.shift() || "No Title"; // Remove the first element as title, defaulting to "No Title" if undefined
      const listHtml = points.map(point => `<li>${point.trim()}</li>`).join(''); // Create list items and join them
      return `<h3>${title.trim()}</h3><ul>${listHtml}</ul>`; // Wrap title and list items in tags
    }
    return ''; // Return empty if no content
  };

  // Assuming 'result' is plain text and needs to be converted
  const resultListHtml = convertToHtmlList(result);

  return (
    <>
      <style>{`
        .resultContent ul {
          list-style-type: disc;
          padding-left: 20px;
        }
        .resultContent li {
          margin-bottom: 10px;
        }
        .resultContent h3 {
          margin-bottom: 20px;  // Add space between the title and list
        }
      `}</style>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/20 backdrop-blur fixed inset-0 z-50 grid place-items-center"
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
                <div className="text-center mb-6 resultContent" dangerouslySetInnerHTML={{ __html: resultListHtml }}></div>
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
    </>
  );
};

export default ResultsModal;
