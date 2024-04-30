import React, { useState } from "react";
import "./BasicQuestions.css"; // Import CSS file
import getCareerAdvice from '../API'; // Adjust path as necessary

// Define a type for the question structure
type QuestionType = {
  question: string;
  options: string[];
  hasOtherOption?: boolean; // Indicates if there's an 'Other' option that requires a text input
};

// Career assessment questions with the specified inputs
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
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
  const [otherText, setOtherText] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState(false);

  const handleOptionClick = (option: string) => {
    if (option === "Other") {
      setShowOtherInput(true);
    } else {
      answers[currentQuestionIndex] = option;
      setAnswers(answers);
      setShowOtherInput(false);
      advanceQuestion();
    }
  };

  const handleOtherSubmit = () => {
    if (!otherText.trim()) {
      alert("Must enter text");
      return;
    }
    answers[currentQuestionIndex] = otherText;
    setAnswers(answers);
    setOtherText("");
    setShowOtherInput(false);
    advanceQuestion();
  };

  const advanceQuestion = async () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < careerQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      const fullPrompt = "Based on these answers, what career path do you recommend? " + answers.join(", ");
      
      // Construct the messages array required by getCareerAdvice
      const messages = [{
        role: 'user', // Assuming 'user' is the correct role for this message
        content: fullPrompt
      }];
  
      try {
        const advice = await getCareerAdvice(messages);
        alert("Quiz Complete. Career advice: " + advice);
      } catch (error) {
        alert("There was an error getting career advice: " + error);
      }
  
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0); // Reset the index for the progress bar
    setAnswers(Array(careerQuestions.length).fill("")); // Optionally clear all previous answers
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const ProgressBar = ({ current, total }: { current: number; total: number }) => {
    const progressPercent = (current / total) * 100;
    return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>
    );
  };



  if (!quizStarted) {
    return (
      <div className="quiz-container-basic">
        <div className="basic-quiz-box">
          <h1>Basic Questions Quiz</h1>
          <p>Click below to start the quiz. Answer some questions to find out more about your preferences!</p>
          <button className="start-button" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container-basic">
      <div className="basic-quiz-box">
        <h1>Career Assessment</h1>
        <ProgressBar current={currentQuestionIndex + 1} total={careerQuestions.length} />
        <div style={{ marginTop: "20px" }}>
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
        </div>
      </div>
    </div>
  );
};

export default BasicQuestion;
