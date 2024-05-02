import React, { Dispatch, SetStateAction, useRef } from "react";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import QuizHeader from "./QuizHeader";

interface HomePageProps {
  keyData: string;
  setKey: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomePage = ({ keyData, setKey, handleSubmit, changeKey }: HomePageProps) => {
  const quizRef = useRef<HTMLDivElement>(null);
  const handleStartClick = () => {
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage-container">
      <HeroSection handleStartClick={handleStartClick} />
      <div className="quiz-container" ref={quizRef}>
        <QuizHeader />
        <div className="quiz-box">
          <h2>Basic Questions Quiz</h2>
          <p>Start with some fundamental questions to test your basic knowledge.</p>
          <Link to="/basic-questions" className="button">
            Start Basic Quiz
          </Link>
        </div>
        <div className="quiz-box">
          <h2>Detailed Questions Quiz</h2>
          <p>Dive deeper with detailed questions for a thorough challenge.</p>
          <Link to="/detailed-questions" className="button">
            Start Detailed Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
