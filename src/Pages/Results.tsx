import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { CgDetailsMore, CgDetailsLess } from "react-icons/cg";

interface Tab {
  name: string;
  path: string;
  icon: JSX.Element;
}

interface TabProps {
  selected: Tab;
  setSelected: Dispatch<SetStateAction<Tab>>;
}

interface QuestionsProps {
  selected: string;
}

type ResultType = {
  title: string;
  description: string;
};

const Results: React.FC = () => {
  const [selected, setSelected] = useState<Tab>(TABS[0]);
  const [results, setResults] = useState<{ [key: string]: ResultType[] }>({});

  useEffect(() => {
    const loadResults = () => {
      const storedResults = JSON.parse(localStorage.getItem("quizResults") || "{}");
      setResults(storedResults);
    };
    loadResults();
  }, []);

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
        <span className="mb-8 bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text font-medium text-transparent">Results Overview</span>
        <span className="mb-8 text-5xl font-bold">Access Previous Quiz Results</span>
      </div>
      <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />
    </>
  );
};

const Tabs: React.FC<TabProps> = ({ selected, setSelected }) => {
  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path);
  };

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
            <span className="relative z-20">{tab.name}</span>
            <span className="relative z-20" onClick={() => navigateTo(tab.path)}>
              {tab.icon}
            </span>
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
                className="absolute inset-0 z-10 bg-gradient-to-r from-violet-600 to-indigo-600"
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
    <div className="mx-auto mt-12 max-w-3xl min-h-[300px]">
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
                <Result key={idx} {...q} />
              ))}
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
    </div>
  );
};

const Result = ({ title, description }: ResultType) => {
  const [open, setOpen] = useState(false);
  const [ref, { height }] = useMeasure();

  return (
    <motion.div animate={open ? "open" : "closed"} className={`rounded-xl border-[1px] border-slate-700 px-4 transition-colors ${open ? "bg-slate-800" : "bg-slate-900"}`}>
      <button onClick={() => setOpen((pv) => !pv)} className="flex w-full items-center justify-between gap-4 py-4">
        <span className={`text-left text-lg font-medium transition-colors ${open ? "text-slate-50" : "text-slate-400"}`}>{title}</span>
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
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-400"
      >
        <p ref={ref}>{description}</p>
      </motion.div>
    </motion.div>
  );
};

const TABS: Tab[] = [
  { name: "Detailed Questions Results", path: "/detailed-questions", icon: <CgDetailsMore /> },
  { name: "Basic Questions Results", path: "/basic-questions", icon: <CgDetailsLess /> },
];

const QUESTIONS = {
  "Detailed Questions Results": [
    {
      title: "Result 1",
      description:
        "I am a sophomore at the University of Delaware majoring in Computer Science with a minor in Business Administration and a concentration in Cybersecurity. I am passionate about developing software solutions that enhance operational efficiency and user engagement.",
    },
    {
      title: "Result 2",
      description:
        "I am a software developer with 2 years of experience in building web applications using React, Node.js, and MongoDB. I have worked on projects ranging from e-commerce platforms to social networking sites.",
    },
    {
      title: "Result 3",
      description:
        "I am a full-stack developer with expertise in building scalable and secure web applications. I have experience working with cloud technologies such as AWS and Azure and have developed RESTful APIs for various projects.",
    },
  ],

  "Basic Questions Results": [
    {
      title: "Who Am I?",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
    {
      title: "What do I do?",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
    {
      title: "What is My Experience?",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempora quasi eligendi distinctio, mollitia porro repudiandae modi consectetur consequuntur perferendis!",
    },
  ],
};

export default Results;
