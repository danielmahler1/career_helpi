import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { CgDetailsMore, CgDetailsLess } from "react-icons/cg";
import StaggeredDropDown from "../Components/StaggeredDropDown";

interface Tab {
  name: string;
  path: string;
  icon: JSX.Element;
}

interface TabProps {
  selected: Tab;
  setSelected: Dispatch<SetStateAction<Tab>>;
}

interface StoredResult extends ResultType {
  questionType: string;
}

interface ResultsByType {
  [key: string]: ResultType[];
}

interface QuestionsProps {
  selected: string;
  results: Record<string, ResultType[]>;
}

type ResultType = {
  title: string;
  description: string;
};

const Results: React.FC = () => {
  const [selected, setSelected] = useState<Tab>(TABS[0]);
  const [results, setResults] = useState<ResultsByType>({});

  useEffect(() => {
    const loadResults = () => {
      const storedResults = JSON.parse(localStorage.getItem("quizResults") || "[]") as StoredResult[];
      const resultsByType = storedResults.reduce<ResultsByType>((acc, result) => {
        const { questionType, ...rest } = result;
        acc[questionType] = acc[questionType] || [];
        acc[questionType].push(rest);
        return acc;
      }, {});
      setResults(resultsByType);
    };
    loadResults();
  }, []);

  const handleDeleteAllResults = () => {
    localStorage.removeItem("quizResults");
    setResults({});
  };

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-900 px-4 py-12 text-slate-50">
      <StaggeredDropDown deleteAllResults={handleDeleteAllResults} />
      <Heading />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected.name} results={results} />
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

const Questions: React.FC<QuestionsProps> = ({ selected, results }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl min-h-[300px]">
      <AnimatePresence mode="wait">
        {Object.entries(results).map(([tab, resultsArray]) => {
          const recentResults = resultsArray.slice(-4).reverse();
          const isTabSelected = selected === tab;

          return isTabSelected ? (
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
              {recentResults.length > 0 ? recentResults.map((result, idx) => <Result key={idx} {...result} />) : <div className="text-center py-10">No recent results available.</div>}
            </motion.div>
          ) : null;
        })}

        {Object.entries(results).every(([tab, resultsArray]) => selected === tab && resultsArray.length === 0) && (
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">No Results Found!</span> Please take a quiz to view results.
            </div>
          </div>
        )}
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
  { name: "Basic Questions", path: "/basic-questions", icon: <CgDetailsLess /> },
  { name: "Detailed Questions", path: "/detailed-questions", icon: <CgDetailsMore /> },
];

export default Results;
