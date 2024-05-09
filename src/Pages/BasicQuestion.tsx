import React, { useState } from "react";
import getCareerAdvice from "../Components/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GradientShadowButton from "../Components/GradientShadowButton";
import SteppedProgress from "../Components/SteppedProgress";
import "../Styles/BasicQuestion.css";
import BarLoader from "../Components/BarLoader";
import ResultsModal from "../Components/ResultsModal";
import StaggeredDropDown from "../Components/StaggeredDropDown";

type QuestionType = {
  question: string;
  options: string[];
  hasOtherOption?: boolean;
};

interface Result {
  title: string;
  description: string;
}

const careerQuestions: QuestionType[] = [
  {
    question: "What is your highest level of education?",
    options: ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate or higher"],
  },
  {
    question: "What are your primary professional skills?",
    options: ["Technical", "Creative", "Business", "Math", "Hospitality"],
    hasOtherOption: true,
  },
  {
    question: "How many years of work experience do you have in your current or most recent field?",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"],
  },
  {
    question: "Which of these work environments do you prefer?",
    options: ["Remote", "In-office", "Hybrid"],
  },
  {
    question: "What are your main career goals?",
    options: ["Stability", "High income", "Flexibility", "Helping others"],
  },
  {
    question: "Which industries are you interested in working in?",
    options: ["Healthcare", "Education", "Technology", "Business", "Entertainment"],
    hasOtherOption: true,
  },
  {
    question: "How important is work-life balance to you on a scale of 1 to 10?",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
];

const BasicQuestion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(careerQuestions.length).fill(""));
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveResultsToLocalStorage = (newResult: Result) => {
    const existingResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
    const updatedResults = [...existingResults, newResult];
    localStorage.setItem("quizResults", JSON.stringify(updatedResults));
  };

  const handleApiSuccess = (advice: string) => {
    toast.success("Career Advice Generated Successfully");
    setResult(advice);
    const timestamp = new Date().toLocaleString();
    const title = `Results - ${timestamp}`;
    const newResult = {
      questionType: "Basic Questions",
      title: title,
      description: advice,
    };
    saveResultsToLocalStorage(newResult);
    setIsModalOpen(true);
  };

  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
    advanceQuestion();
  };

  const onStepClick = (stepIndex: number) => {
    if (stepIndex <= currentQuestionIndex) {
      setCurrentQuestionIndex(stepIndex);
    }
  };

  const advanceQuestion = async () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < careerQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setIsLoading(true);
      const fullPrompt =
        "Answer with the career path you reccomend, give a concise answer based on the prompts we gave and the answers provided by the user, no more than 10 sentences: " + answers.join(", ");
      const messages = [{ role: "user", content: fullPrompt }];
      try {
        const advice = await getCareerAdvice(messages);
        handleApiSuccess(advice);
      } catch (error) {
        toast.error("Error Generating Career Advice");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers(Array(careerQuestions.length).fill(""));
    setResult("");
    setIsModalOpen(false);
    toast.success("Quiz Reset Successfully");
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-900 px-4 py-12 text-slate-50 relative">
      <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />
      <StaggeredDropDown resetQuiz={resetQuiz} />
      <div className="flex flex-col items-center justify-start p-5 text-center text-white bg-dark-gray rounded-lg shadow-custom overflow-y-auto w-full h-[400px] mx-auto my-5 md:max-w-xl lg:max-w-2xl">
        {isLoading ? (
          <div className="loading-modal flex flex-col items-center justify-center">
            <div className="mb-2">Generating Career Advice...</div>
            <BarLoader />
          </div>
        ) : quizStarted ? (
          <>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 ">Basic Questions</h1>
            <SteppedProgress stepsComplete={currentQuestionIndex} numSteps={careerQuestions.length} onStepClick={onStepClick} />
            <h2 className="text-xl font-medium mt-5">{careerQuestions[currentQuestionIndex].question}</h2>
            {careerQuestions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} className="option-button" onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center my-auto">
            <h1 className="text-white mb-4 text-3xl">Basic Questions Quiz</h1>
            <p className="mb-6 text-white">Click below to start the quiz. Answer some questions to find out more about your preferences!</p>
            <GradientShadowButton onClick={startQuiz} buttonText="Start Quiz" />
          </div>
        )}
        <ResultsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} result={result} resetQuiz={resetQuiz} />
      </div>
    </section>
  );
};

export default BasicQuestion;
