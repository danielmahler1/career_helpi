import React, { useState } from 'react';

// Define a type for the question structure
type QuestionType = {
  question: string;
};

// Sample questions - you can replace or add more
const sampleQuestions: QuestionType[] = [
  { question: 'Describe a project or task where you felt the most engaged and fulfilled. What were you doing, and why did it feel significant to you?' },
  { question: 'What specific aspects of your previous jobs have you liked and disliked? (Consider aspects like company culture, management style, job duties, etc.)' },
  { question: 'How do you handle stress and pressure at work? Can you provide an example of a stressful situation and how you managed it?' },
  { question: 'What are your long-term career aspirations? Where do you see yourself in 5, 10, and 20 years?' },
  { question: 'What are your strengths and weaknesses as they relate to your desired career field?' },
  { question: 'If you had the opportunity to learn any new skill without restrictions, what skill would you choose and why?' },
  { question: "What values are most important to you in a workplace? How do you evaluate a potential employer's alignment with these values?" },
];

const DetailedQuestions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(sampleQuestions.length).fill(''));
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset the input field after moving to the next question
      setAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex + 1] = ''; // Clear the next question's input
        return updatedAnswers;
      });
    } else {
      alert('Quiz Complete.');
      resetQuiz(); // Reset the quiz when complete
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false); // Reset the quiz state
    setCurrentQuestionIndex(0); // Reset the question index
    setAnswers(Array(sampleQuestions.length).fill('')); // Clear all answers
  };

  const ProgressBar = ({ current, total }: { current: number; total: number }) => {
    const progressPercent = (current / total) * 100;
    return (
      <div style={{ width: '100%', backgroundColor: '#333', borderRadius: '5px', margin: '10px 0' }}>
        <div
          style={{
            height: '10px',
            width: `${progressPercent}%`,
            backgroundColor: '#4CAF50',
            borderRadius: '5px',
          }}
        ></div>
      </div>
    );
  };

  if (!quizStarted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#282c34',
        }}
      >
        <div
          style={{
            padding: '40px',
            borderRadius: '10px',
            maxWidth: '600px',
            textAlign: 'center',
            backgroundColor: '#1c1e22',
            color: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          <h1>Welcome to the Detailed Questions Quiz</h1>
          <p>
            Click below to start the quiz. Answer some basic questions to find out more about your preferences!
          </p>
          <button
            onClick={startQuiz}
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              cursor: 'pointer',
              backgroundColor: '#4CAF50',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
            }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#282c34',
      }}
    >
      <div
        style={{
          width: '600px',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#1c1e22',
          color: 'white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        }}
      >
        <h1>Detailed Questions</h1>
        <ProgressBar current={currentQuestionIndex + 1} total={sampleQuestions.length} />
        <div style={{ marginTop: '20px' }}>
          <h2>{sampleQuestions[currentQuestionIndex].question}</h2>
          <input
            type="text"
            value={answers[currentQuestionIndex]}
            onChange={handleAnswer}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#2c3038',
              color: 'white',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          />
          <button
            onClick={moveToNextQuestion}
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              cursor: 'pointer',
              backgroundColor: '#4CAF50',
              borderRadius: '5px',
              color: 'white',
              border: 'none',
            }}
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedQuestions;
