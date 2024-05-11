import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import QuizHeader from "./QuizHeader";
import GradientShadowButton from "./GradientShadowButton";
import "../Styles/HomePage.css";

const HomePage = () => {
  const quizRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleStartClick = () => {
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <HeroSection handleStartClick={handleStartClick} />
      <div className="homepage-container">
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
    </>
  );
};

export default HomePage;
