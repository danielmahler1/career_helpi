import React, { useState } from "react";
import getCareerAdvice from "../Components/API"; // Adjust path as necessary
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GradientShadowButton from "../Components/GradientShadowButton";
import BeamInput from "../Components/BeamInput";
import SteppedProgress from "../Components/SteppedProgress";
import "../Styles/DetailedQuestions.css";
import BarLoader from "../Components/BarLoader";

type QuestionType = {
  question: string;
};

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
        "Answer with the career path you reccomend, give a concise answer based on the prompts we gave and the answers provided by the user, no more than 10 sentences: " + answers.join(", ");
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

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers(Array(sampleQuestions.length).fill(""));
    setResult("");
  };

  if (!quizStarted || result) {
    return (
      <div className="quiz-container-detailed">
        <div className="detailed-quiz-box">
          <div className="content-center">
            {result ? (
              <>
                <h1>Career Advice</h1>
                <p>{result}</p>
                <button onClick={resetQuiz}>Restart Quiz</button>
              </>
            ) : (
              <>
                <h1>Detailed Questions Quiz</h1>
                <p>Click below to start the quiz. Answer some questions to find out more about your preferences!</p>
                <GradientShadowButton onClick={startQuiz} buttonText="Start Quiz" />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container-detailed">
      <div className="detailed-quiz-box">
        {isLoading ? (
          <div className="loading-modal">
            <div className="loading-text">Generating Career Advice...</div>
            <BarLoader />
          </div>
        ) : (
          <>
            <h1>Detailed Questions</h1>
            <SteppedProgress stepsComplete={currentQuestionIndex} numSteps={sampleQuestions.length} />
            <div>
              <h2>{sampleQuestions[currentQuestionIndex].question}</h2>
            </div>
            <div className="beam-input-container">
              <BeamInput inputValue={answers[currentQuestionIndex]} setInputValue={handleInputValueChange} onSubmit={() => moveToNextQuestion()} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailedQuestion;
