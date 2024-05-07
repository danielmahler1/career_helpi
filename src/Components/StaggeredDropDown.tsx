import { FiEdit, FiChevronDown } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineFeedback } from "react-icons/md";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";

type OptionProps = {
  text: string;
  Icon: IconType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClick: () => void;
};

type StaggeredDropDownProps = {
  resetQuiz: () => void;
};

const StaggeredDropDown = ({ resetQuiz }: StaggeredDropDownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div animate={open ? "open" : "closed"} className="fixed left-20 top-9 w-fit">
      <button onClick={() => setOpen((prev) => !prev)} className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-600 transition-colors">
        <span className="font-medium text-sm">Action Bar</span>
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
        <Option setOpen={setOpen} Icon={GrPowerReset} text="Reset Quiz" onClick={resetQuiz} />
        <Option setOpen={setOpen} Icon={FiEdit} text="Edit API Key" onClick={resetQuiz} />
        <Option setOpen={setOpen} Icon={MdOutlineFeedback} text="Submit Feedback" onClick={resetQuiz} />
      </motion.ul>
    </motion.div>
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
