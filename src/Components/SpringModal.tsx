import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify"; // Ensure you have react-toastify installed and imported

interface SpringModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  apiKey: string;
  setApiKey: Dispatch<SetStateAction<string>>;
}

const SpringModal: React.FC<SpringModalProps> = ({ isOpen, setIsOpen, apiKey, setApiKey }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (apiKey.trim() === "") {
      toast.error("API Key Cannot Be Empty");
      return;
    }
    localStorage.setItem("MYKEY", apiKey);
    toast.success("API Key Saved Successfully");
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">Enter Your API Key</h3>
              <p className="text-center mb-6">
                Please input your OpenAI key below. Your key is stored locally on your device and is only used to authenticate requests to OpenAI servers when accessing services.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="password" value={apiKey} onChange={handleChange} className="text-sm p-2 border border-gray-300 rounded w-full text-black" placeholder="Enter API Key:" />
                <div className="flex gap-2 mt-4">
                  <button type="button" onClick={() => setIsOpen(false)} className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded">
                    Close
                  </button>
                  <button type="submit" className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
