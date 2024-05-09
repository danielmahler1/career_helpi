import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GradientShadowButton from "../Components/GradientShadowButton";
import BeamInput from "../Components/BeamInput";
import SteppedProgress from "../Components/SteppedProgress";
import "../Styles/DetailedQuestions.css";
import BarLoader from "../Components/BarLoader";
import ResultsModal from "../Components/ResultsModal";
import AIResponseHandler from "../Components/API"; // Import the AIResponseHandler class
import StaggeredDropDown from "../Components/StaggeredDropDown";

type QuestionType = {
  question: string;
};

interface Result {
  title: string;
  description: string;
}

const sampleQuestions: QuestionType[] = [
  { question: "Describe a project or task where you felt the most engaged and fulfilled. What were you doing, and why did it feel significant to you?" },
  { question: "What specific aspects of your previous jobs have you liked and disliked? (Consider aspects like company culture, management style, job duties, etc.)" },
  { question: "How do you handle stress and pressure at work? Can you provide an example of a stressful situation and how you managed it?" },
  { question: "What are your long-term career aspirations? Where do you see yourself in 5, 10, and 20 years?" },
  { question: "What are your strengths and weaknesses as they relate to your desired career field?" },
  { question: "If you had the opportunity to learn any new skill without restrictions, what skill would you choose and why?" },
  { question: "What values are most important to you in a workplace? How do you evaluate a potential employer's alignment with these values?" },
];

const DetailedQuestion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(sampleQuestions.length).fill(""));
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const aiHandler = new AIResponseHandler(); // Use AIResponseHandler for API interactions

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
      questionType: "Detailed Questions",
      title: title,
      description: advice,
    };
    saveResultsToLocalStorage(newResult);
    setIsModalOpen(true);
  };

  const handleInputValueChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const moveToNextQuestion = async () => {
    if (answers[currentQuestionIndex].trim() === "") {
      toast.error("An Answer is Required!");
      return;
    }
  
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < sampleQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setIsLoading(true);
      const fullPrompt =
        "Answer with the career path you recommend, give a concise answer based on the prompts we gave and the answers provided by the user, no more than 10 sentences: " + answers.join(", ");
      const messages = [{ role: "user", content: fullPrompt }];
  
      try {
        const advice = await aiHandler.getCareerAdvice(messages);
        handleApiSuccess(advice);
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Error Generating Career Advice: " + error.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false;
    setCurrentQuestionIndex(0);
    setAnswers(Array(sampleQuestions.length).fill(""));
    setResult("");
    setIsModalOpen(false);
    toast.success("Quiz Reset Successfully");
  };

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-900 px-4 py-12 text-slate-50 relative">
      <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />
      <StaggeredDropDown resetQuiz={resetQuiz} />
      <div className="detailed-quiz-box">
        {isLoading ? (
          <div className="loading-modal">
            <div className="loading-text">Generating Career Advice...</div>
            <BarLoader />
          </div>
        ) : quizStarted ? (
          <>
            <h1>Detailed Questions</h1>
            <SteppedProgress stepsComplete={currentQuestionIndex} numSteps={sampleQuestions.length} />
            <div>
              <h2>{sampleQuestions[currentQuestionIndex].question}</h2>
            </div>
            <div className="beam-input-container">
              <BeamInput inputValue={answers[currentQuestionIndex]} setInputValue={handleInputValueChange} onSubmit={moveToNextQuestion} />
            </div>
          </>
        ) : (
          <div className="content-center">
            <h1>Detailed Questions Quiz</h1>
            <p>Click below to start the quiz. Answer some questions to find out more about your preferences!</p>
            <GradientShadowButton onClick={startQuiz} buttonText="Start Quiz" />
          </div>
        )}
        <ResultsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} result={result} resetQuiz={resetQuiz} />
      </div>
    </section>
  );
};

export default DetailedQuestion;
