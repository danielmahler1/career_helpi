import React, { useState } from "react";
import GradientShadowButton from "../Components/GradientShadowButton";
import BeamInput from "../Components/BeamInput";

// Define a type for the question structure
type QuestionType = {
  question: string;
};

// Sample questions - you can replace or add more
const sampleQuestions: QuestionType[] = [
  { question: "Describe a project or task where you felt the most engaged and fulfilled. What were you doing, and why did it feel significant to you?" },
  { question: "What specific aspects of your previous jobs have you liked and disliked? (Consider aspects like company culture, management style, job duties, etc.)" },
  { question: "How do you handle stress and pressure at work? Can you provide an example of a stressful situation and how you managed it?" },
  { question: "What are your long-term career aspirations? Where do you see yourself in 5, 10, and 20 years?" },
  { question: "What are your strengths and weaknesses as they relate to your desired career field?" },
  { question: "If you had the opportunity to learn any new skill without restrictions, what skill would you choose and why?" },
  { question: "What values are most important to you in a workplace? How do you evaluate a potential employer's alignment with these values?" },
];

const DetailedQuestions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(sampleQuestions.length).fill(""));
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  const moveToNextQuestion = () => {
    if (answers[currentQuestionIndex].trim() === "") {
      alert("Please answer the current question before proceeding.");
      return; // Do not proceed if the question is not answered
    }

    // Move to the next question
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset the input field after moving to the next question
      setAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex + 1] = ""; // Clear the next question's input
        return updatedAnswers;
      });
    } else {
      alert("Quiz Complete.");
      resetQuiz(); // Reset the quiz when complete
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false); // Reset the quiz state
    setCurrentQuestionIndex(0); // Reset the question index
    setAnswers(Array(sampleQuestions.length).fill("")); // Clear all answers
  };

  const ProgressBar = ({ current, total }: { current: number; total: number }) => {
    const progressPercent = (current / total) * 100;
    return (
      <div className="progress-bar-container">
        <div style={{ width: `${progressPercent}%` }} className="progress-bar"></div>
      </div>
    );
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container-detailed">
        <div className="detailed-quiz-box">
          <div className="content-center">
            <h1>Detailed Questions Quiz</h1>
            <p>Click below to start the quiz. Answer some questions to find out more about your preferences!</p>
            <GradientShadowButton onClick={startQuiz} buttonText="Start Quiz" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container-detailed">
      <div className="detailed-quiz-box">
        <h1>Detailed Questions</h1>
        <ProgressBar current={currentQuestionIndex + 1} total={sampleQuestions.length} />
        <div>
          <h2>{sampleQuestions[currentQuestionIndex].question}</h2>
          <BeamInput />
        </div>
      </div>
    </div>
  );
};

export default DetailedQuestions;
