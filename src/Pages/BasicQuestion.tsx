import React, { useState } from "react";
import "../Styles/BasicQuestions.css"; // Import CSS file
import getCareerAdvice from "../Components/API"; // Adjust path as necessary
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type QuestionType = {
  question: string;
  options: string[];
  hasOtherOption?: boolean;
};

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

  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers];
    if (option === "Other") {
      // Handle "Other" option logic if needed
    } else {
      newAnswers[currentQuestionIndex] = option;
      setAnswers(newAnswers);
      advanceQuestion();
    }
  };

  const advanceQuestion = async () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < careerQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setIsLoading(true);
      const fullPrompt = "Based on these answers, what career path do you recommend? " + answers.join(", ");
      const messages = [{ role: "user", content: fullPrompt }];
      try {
        const advice = await getCareerAdvice(messages);
        toast.success("Career Advice Generated Successfully");
        setResult(advice);
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
  };

  const ProgressBar = ({ current, total }: { current: number; total: number }) => {
    const progressPercent = (current / total) * 100;
    return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>
    );
  };

  if (!quizStarted || result) {
    return (
      <div className="quiz-container-basic">
        <div className="basic-quiz-box">
          {result ? (
            <>
              <h1>Career Advice</h1>
              <p>{result}</p>
              <button onClick={resetQuiz}>Restart Quiz</button>
            </>
          ) : (
            <>
              <h1>Basic Questions Quiz</h1>
              <p>Click below to start the quiz. Answer some questions to find out more about your preferences!</p>
              <button className="start-button" onClick={() => setQuizStarted(true)}>
                Start Quiz
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container-basic">
      <div className="basic-quiz-box">
        {isLoading ? (
          <div className="loading-modal">
            <div className="loading-text">Generating Career Advice...</div>
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          </div>
        ) : (
          <>
            <h1>Career Assessment</h1>
            <ProgressBar current={currentQuestionIndex + 1} total={careerQuestions.length} />
            <h2>{careerQuestions[currentQuestionIndex].question}</h2>
            {careerQuestions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} className="option-button" onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BasicQuestion;
