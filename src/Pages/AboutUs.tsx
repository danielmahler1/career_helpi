import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import useMeasure from "react-use-measure";

interface Tab {
  name: string;
  github: string;
  linkedin: string;
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
            <span className="relative z-20">{tab.name}</span>
            <a href={tab.github} target="_blank" rel="noopener noreferrer" className="inline-block z-20">
              <FaGithub className="text-lg" />
            </a>
            <a href={tab.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block z-20">
              <FaLinkedin className="text-lg" />
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
  const [ref, { height }] = useMeasure();

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
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-400"
      >
        <p ref={ref}>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const TABS: Tab[] = [
  { name: "Nathan Wolf", github: "https://github.com/natew100", linkedin: "https://www.linkedin.com/in/nathanwolf1/" },
  { name: "Daniel Mahler", github: "https://github.com/danielmahler1", linkedin: "https://www.linkedin.com/in/daniel-mahler/" },
  { name: "Ben Kellner", github: "https://github.com/BMKellner", linkedin: "https://www.linkedin.com/in/benjamin-kellner-849196256/" },
];

const QUESTIONS = {
  "Nathan Wolf": [
    {
      question: "Who Am I?",
      answer:
        "I am a sophomore at the University of Delaware majoring in Computer Science with a minor in Business Administration and a concentration in Cybersecurity. I am passionate about developing software solutions that enhance operational efficiency and user engagement.",
    },
    {
      question: "What do I do?",
      answer:
        "I specialize in creating robust software solutions using a diverse tech stack including Python, Java, JavaScript, React, and Flask. My experience extends to full-stack development, database management, and aligning technology projects with business objectives.",
    },
    {
      question: "What is My Experience?",
      answer:
        "With internships in software engineering, I have developed key projects like a full-stack real estate portal and a training management system. Additionally, as the founder of previously ran software robotic application, I led a team to build and scale a software solution that significantly boosted efficiency and sales for clients.",
    },
  ],

  "Daniel Mahler": [
    {
      question: "Who Am I?",
      answer: "I am a sophomore at the University of Delaware majoring in Computer Science with a concentration in Cybersecurity and a minor in Business Administration. I am enthusiastic about building software that enhances efficiency and optimizes user involvement.",
    },
    {
      question: "What do I do?",
      answer: "I have a diverse skill set in software development, proficient in languages and frameworks including Python, Java, JavaScript, React, C, and C++. ",
    },
    {
      question: "What is My Experience?",
      answer: "I maintained the official website for a college organization, utilizing a blend of technologies including JavaScript and Angular for frontend development. This project not only honed my full-stack development skills but also enhanced my ability to integrate technical solutions with organizational objectives.",
    },
  ],
  "Ben Kellner": [
    {
      question: "Who Am I?",
      answer: "I am a sophomore at the University of Delaware majoring in Computer science with a concentration in Cybersecurity",
    },
    {
      question: "What do I do?",
      answer: "I excel in developing strong software systems utilizing a varied tech stack that includes Python, Java, and JavaScript, along with React for front-end development. My expertise covers full-stack development and ensuring that technology initiatives are in sync with business goals.",
    },
    {
      question: "What is My Experience?",
      answer: "I have created a web scraping website to gain information of all relevant financial news and interned at a digital agenct specializing in marketing and web development. I have also worked on a project that involved creating a website for a local business and full stack development",
    },
  ],
};

export default AboutUs;
