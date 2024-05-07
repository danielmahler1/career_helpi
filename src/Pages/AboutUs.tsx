import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaGithub } from "react-icons/fa"; // Import GitHub icon from react-icons

interface Tab {
  name: string;
  github: string;
}

interface TabProps {
  selected: Tab;
  setSelected: Dispatch<SetStateAction<Tab>>;
}

interface QuestionsProps {
  selected: string;
}

type QuestionType = {
  question: string;
  answer: string;
};

const AboutUs: React.FC = () => {
  const [selected, setSelected] = useState<Tab>(TABS[0]);
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-900 px-4 py-12 text-slate-50">
      <Heading />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected.name} />
    </section>
  );
};

const Heading = () => {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className="mb-8 bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text font-medium text-transparent">About Our Team</span>
        <span className="mb-8 text-5xl font-bold">Who We Are</span>
      </div>
      <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />
    </>
  );
};

const Tabs: React.FC<TabProps> = ({ selected, setSelected }) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {TABS.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected.name === tab.name ? "border-violet-500 text-slate-50" : "border-slate-600 bg-transparent text-slate-400"
          }`}
          key={tab.name}
        >
          <div className="flex items-center space-x-2">
            <span className="relative z-20">{tab.name}</span> {/* Adjusted z-index of name */}
            <a href={tab.github} target="_blank" rel="noopener noreferrer" className="inline-block z-20">
              <FaGithub className="text-lg" /> {/* Adjusted z-index of icon */}
            </a>
          </div>
          <AnimatePresence>
            {selected.name === tab.name && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-10 bg-gradient-to-r from-violet-600 to-indigo-600" // Adjusted z-index of gradient
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};

const Questions: React.FC<QuestionsProps> = ({ selected }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl min-h-[350px]">
      <AnimatePresence mode="wait">
        {Object.entries(QUESTIONS).map(([tab, questions]) => {
          return selected === tab ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: "backIn",
              }}
              className="space-y-4"
              key={tab}
            >
              {questions.map((q, idx) => (
                <Question key={idx} {...q} />
              ))}
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
    </div>
  );
};

const Question = ({ question, answer }: QuestionType) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div animate={open ? "open" : "closed"} className={`rounded-xl border-[1px] border-slate-700 px-4 transition-colors ${open ? "bg-slate-800" : "bg-slate-900"}`}>
      <button onClick={() => setOpen((pv) => !pv)} className="flex w-full items-center justify-between gap-4 py-4">
        <span className={`text-left text-lg font-medium transition-colors ${open ? "text-slate-50" : "text-slate-400"}`}>{question}</span>
        <motion.span
          variants={{
            open: {
              rotate: "45deg",
            },
            closed: {
              rotate: "0deg",
            },
          }}
        >
          <FiPlus className={`text-2xl transition-colors ${open ? "text-slate-50" : "text-slate-400"}`} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "fit-content" : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-400"
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const TABS: Tab[] = [
  { name: "Nathan Wolf", github: "https://github.com/nathanwolf" },
  { name: "Daniel Mahler", github: "https://github.com/danielmahler" },
  { name: "Ben Kellner", github: "https://github.com/benkellner" },
];

const QUESTIONS = {
  "Nathan Wolf": [
    {
      question: "Who Am I?",
      answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
    {
      question: "What do I do?",
      answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
    {
      question: "What is My Experience?",
      answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
  ],
  "Daniel Mahler": [
    {
      question: "Who Am I?",
      answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
    {
      question: "What do I do?",
      answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
    {
      question: "What is My Experience?",
      answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
  ],
  "Ben Kellner": [
    {
      question: "Who Am I?",
      answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
    {
      question: "What do I do?",
      answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
    {
      question: "What is My Experience?",
      answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
  ],
};

export default AboutUs;
