import React, { useState } from "react";
import getCareerAdvice from "../Components/API"; // Adjust path as necessary
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GradientShadowButton from "../Components/GradientShadowButton"; // Import the component
import SteppedProgress from "../Components/SteppedProgress";
import "../Styles/BasicQuestion.css";

type QuestionType = {
  question: string;
  options: string[];
  hasOtherOption?: boolean; // Indicates if there's an 'Other' option that requires a text input
};

const careerQuestions: QuestionType[] = [
  {
    question: "What is your highest level of education?",
    options: ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate or higher"],
  },
  {
    question: "What are your primary professional skills?",
    options: ["Technical", "Creative", "Business", "Math", "Hospitality", "Other"],
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
    options: ["Healthcare", "Education", "Technology", "Business", "Entertainment", "Other"],
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
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionClick = (option: string) => {
    if (option === "Other") {
      setShowOtherInput(true);
    } else {
      const newAnswers = [...answers]; // Create a copy of the answers array
      newAnswers[currentQuestionIndex] = option;
      setAnswers(newAnswers);
      setShowOtherInput(false);
      advanceQuestion();
    }
  };

  const handleOtherSubmit = () => {
    if (!otherText.trim()) {
      alert("Must enter text");
      return;
    }
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = otherText;
    setAnswers(newAnswers);
    setOtherText("");
    setShowOtherInput(false);
    advanceQuestion();
  };

  const advanceQuestion = async () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < careerQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setIsLoading(true);
      const fullPrompt = "Based on these answers, what career path do you recommend: " + answers.join(", ");
      const messages = [{ role: "user", content: fullPrompt }];
      try {
        const advice = await getCareerAdvice(messages);
        toast.success("Career Advice Generated Successfully");
        alert("Quiz Complete. Career advice: " + advice);
      } catch (error) {
        toast.error("Error Generating Career Advice");
      } finally {
        setIsLoading(false);
        resetQuiz();
      }
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers(Array(careerQuestions.length).fill(""));
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container-basic">
        <div className="basic-quiz-box">
          <div className="content-center">
            <h1>Basic Questions Quiz</h1>
            <p>Click below to start the quiz. Answer some questions to find out more about your preferences!</p>
            <GradientShadowButton onClick={startQuiz} buttonText="Start Quiz" />
          </div>
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
            <h1>Basic Questions</h1>
            <SteppedProgress stepsComplete={currentQuestionIndex} numSteps={careerQuestions.length} />
            <h2>{careerQuestions[currentQuestionIndex].question}</h2>
            {careerQuestions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} className="option-button" onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            ))}
            {showOtherInput && careerQuestions[currentQuestionIndex].hasOtherOption && (
              <>
                <input type="text" value={otherText} onChange={(e) => setOtherText(e.target.value)} placeholder="Please specify" className="other-input" />
                <button className="other-submit" onClick={handleOtherSubmit}>
                  Enter
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BasicQuestion;
