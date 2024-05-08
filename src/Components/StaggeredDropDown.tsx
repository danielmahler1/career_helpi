import { FiEdit, FiChevronDown } from "react-icons/fi";
import { GrPowerReset, GrTrash } from "react-icons/gr";
import { MdOutlineFeedback } from "react-icons/md";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IconType } from "react-icons";
import SpringModal from "./SpringModal";
import FeedbackModal from "./FeedbackModal";

type OptionProps = {
  text: string;
  Icon: IconType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
};

type StaggeredDropDownProps = {
  resetQuiz?: () => void;
  deleteAllResults?: () => void;
};

const StaggeredDropDown = ({ resetQuiz, deleteAllResults }: StaggeredDropDownProps) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const storedKey = localStorage.getItem("MYKEY") || "";
    setApiKey(storedKey);
    const handleStorageChange = () => {
      const updatedKey = localStorage.getItem("MYKEY") || "";
      setApiKey(updatedKey);
    };
    window.addEventListener("apiKeyUpdate", handleStorageChange);
    return () => {
      window.removeEventListener("apiKeyUpdate", handleStorageChange);
    };
  }, []);

  const handleEditApiKey = () => {
    setModalOpen(true);
    setOpen(false);
  };

  const handleFeedbackModalOpen = () => {
    setFeedbackModalOpen(true);
    setOpen(false);
  };

  return (
    <>
      <motion.div animate={open ? "open" : "closed"} className="fixed left-20 top-9 w-fit">
        <button onClick={() => setOpen((prev) => !prev)} className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-600 transition-colors">
          <span className="font-medium text-sm">Action Menu</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          {resetQuiz && <Option setOpen={setOpen} Icon={GrPowerReset} text="Reset Quiz" onClick={resetQuiz} />}
          {deleteAllResults && <Option setOpen={setOpen} Icon={GrTrash} text="Delete All Results" onClick={deleteAllResults} />}
          <Option setOpen={setOpen} Icon={FiEdit} text="Edit API Key" onClick={handleEditApiKey} />
          <Option setOpen={setOpen} Icon={MdOutlineFeedback} text="Submit Feedback" onClick={handleFeedbackModalOpen} />
        </motion.ul>
      </motion.div>
      <SpringModal isOpen={modalOpen} setIsOpen={setModalOpen} apiKey={apiKey} setApiKey={setApiKey} />
      <FeedbackModal isOpen={feedbackModalOpen} setIsOpen={setFeedbackModalOpen} feedback={feedback} setFeedback={setFeedback} />
    </>
  );
};

const Option = ({ text, Icon, setOpen, onClick }: OptionProps) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        onClick();
      }}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
