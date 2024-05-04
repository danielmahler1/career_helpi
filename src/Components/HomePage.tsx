import React, { Dispatch, SetStateAction, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
import HeroSection from "./HeroSection";
import QuizHeader from "./QuizHeader";
import GradientShadowButton from "./GradientShadowButton"; // Import the new button component
import "../Styles/HomePage.css";

interface HomePageProps {
  keyData: string;
  setKey: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomePage = ({ keyData, setKey, handleSubmit, changeKey }: HomePageProps) => {
  const quizRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleStartClick = () => {
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handler for navigation
  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="homepage-container">
      <HeroSection handleStartClick={handleStartClick} />
      <div className="quiz-container" ref={quizRef}>
        <QuizHeader />
        <div className="quiz-box">
          <h2>Basic Questions Quiz</h2>
          <p>Start with some fundamental questions to test your basic knowledge.</p>
          <GradientShadowButton onClick={() => navigateTo("/basic-questions")} buttonText="Start Basic Quiz" />
        </div>
        <div className="quiz-box">
          <h2>Detailed Questions Quiz</h2>
          <p>Dive deeper with detailed questions for a thorough challenge.</p>
          <GradientShadowButton onClick={() => navigateTo("/detailed-questions")} buttonText="Start Detailed Quiz" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
