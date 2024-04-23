import React, { useState } from 'react';

// Define a type for the question structure
type QuestionType = {
  question: string;
  options: string[];
  hasOtherOption?: boolean; // Indicates if there's an 'Other' option that requires a text input
};

// Career assessment questions with the specified inputs
const careerQuestions: QuestionType[] = [
  {
    question: 'What is your highest level of education?',
    options: ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate or higher'],
  },
  {
    question: 'What are your primary professional skills?',
    options: ['Technical', 'Creative', 'Business', 'Math', 'Hospitality', 'Other'],
    hasOtherOption: true,
  },
  {
    question: 'How many years of work experience do you have in your current or most recent field?',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
  },
  {
    question: 'Which of these work environments do you prefer?',
    options: ['Remote', 'In-office', 'Hybrid'],
  },
  {
    question: 'What are your main career goals?',
    options: ['Stability', 'High income', 'Flexibility', 'Helping others'],
  },
  {
    question: 'Which industries are you interested in working in?',
    options: ['Healthcare', 'Education', 'Technology', 'Business', 'Entertainment', 'Other'],
    hasOtherOption: true,
  },
  {
    question: 'How important is work-life balance to you on a scale of 1 to 10?',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
];

const BasicQuestion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(careerQuestions.length).fill(''));
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
  const [otherText, setOtherText] = useState<string>('');
  const [quizStarted, setQuizStarted] = useState(false);

  const handleOptionClick = (option: string) => {
    if (option === 'Other') {
      setShowOtherInput(true);
    } else {
      answers[currentQuestionIndex] = option;
      setAnswers(answers);
      setShowOtherInput(false);
      advanceQuestion();
    }
  };

  const handleOtherSubmit = () => {
    if (!otherText.trim()) return; // Prevent setting an empty 'Other' answer
    answers[currentQuestionIndex] = otherText;
    setAnswers(answers);
    setOtherText('');
    setShowOtherInput(false);
    advanceQuestion();
  };

  const advanceQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < careerQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      alert('Quiz Complete. Answers: ' + answers.join(', '));
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0); // Reset the index for the progress bar
    setAnswers(Array(careerQuestions.length).fill('')); // Optionally clear all previous answers
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
          <h1>Welcome to the Career Assessment</h1>
          <p>Click below to start the assessment. Answer some questions to find out more about your career preferences and opportunities!</p>
          <button onClick={startQuiz} style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer', backgroundColor: '#4CAF50', border: 'none', borderRadius: '5px', color: 'white' }}>Start Assessment</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#282c34' }}>
      <div style={{ width: '600px', padding: '20px', borderRadius: '10px', backgroundColor: '#1c1e22', color: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
        <h1>Career Assessment</h1>
        <ProgressBar current={currentQuestionIndex + 1} total={careerQuestions.length} />
        <div style={{ marginTop: '20px' }}>
          <h2>{careerQuestions[currentQuestionIndex].question}</h2>
          {careerQuestions[currentQuestionIndex].options.map((option, index) => (
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
                    onClick={() => handleOptionClick(option)}>
              {option}
            </button>
          ))}
          {showOtherInput && careerQuestions[currentQuestionIndex].hasOtherOption && (
            <>
              <input type="text" value={otherText} onChange={(e) => setOtherText(e.target.value)} placeholder="Please specify" style={{ width: '100%', padding: '10px', marginTop: '10px' }} />
              <button onClick={handleOtherSubmit} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', border: 'none', borderRadius: '5px', color: 'white', marginTop: '10px' }}>Enter</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicQuestion;
