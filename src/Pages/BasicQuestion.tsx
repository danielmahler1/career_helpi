import React, { useState } from 'react';

// Define a type for the question structure
type QuestionType = {
  question: string;
  options: string[];
};

// Sample questions - you can replace or add more
const sampleQuestions: QuestionType[] = [
  {
    question: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
  },
  {
    question: 'Which season do you prefer?',
    options: ['Spring', 'Summer', 'Autumn', 'Winter'],
  },
  {
    question: 'What kind of books do you like?',
    options: ['Fiction', 'Non-fiction', 'Biography', 'Science Fiction'],
  },
  // Add more questions as needed
];

const BasicQuestion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(sampleQuestions.length).fill(''));
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < sampleQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      alert('Quiz Complete. Answers: ' + newAnswers.join(', '));
      setQuizStarted(false); // Optionally reset or navigate to results page
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const ProgressBar = ({ current, total }: { current: number; total: number }) => {
    const progressPercent = (current / total) * 100;
    return (
      <div style={{ width: '100%', backgroundColor: '#333', borderRadius: '5px', margin: '10px 0' }}>
        <div style={{ height: '10px', width: `${progressPercent}%`, backgroundColor: '#4CAF50', borderRadius: '5px' }}></div>
      </div>
    );
  };

  if (!quizStarted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#282c34' }}>
        <div style={{ padding: '40px', borderRadius: '10px', maxWidth: '600px', textAlign: 'center', backgroundColor: '#1c1e22', color: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
          <h1>Welcome to the Basic Questions Quiz</h1>
          <p>Click below to start the quiz. Answer some basic questions to find out more about your preferences!</p>
          <button onClick={startQuiz} style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer', backgroundColor: '#4CAF50', border: 'none', borderRadius: '5px', color: 'white' }}>Start Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#282c34' }}>
      <div style={{ width: '600px', padding: '20px', borderRadius: '10px', backgroundColor: '#1c1e22', color: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
        <h1>Basic Questions</h1>
        <ProgressBar current={currentQuestionIndex + 1} total={sampleQuestions.length} />
        <div style={{ marginTop: '20px' }}>
          <h2>{sampleQuestions[currentQuestionIndex].question}</h2>
          {sampleQuestions[currentQuestionIndex].options.map((option, index) => (
            <button key={index}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px',
                      marginTop: '10px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      backgroundColor: '#2c3038',
                      border: 'none',
                      color: 'white',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      borderRadius: '5px',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#3a3d43'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#2c3038'}
                    onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicQuestion;
