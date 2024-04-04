import React from 'react';

const BasicQuestion = () => {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
      <h1>Basic Questions</h1>
      <p>This is the Basic Questions page where you can find answers to common questions.</p>
      <ul>
        <li>What is React?</li>
        <p>React is a JavaScript library for building user interfaces.</p>
        <li>What is a component in React?</li>
        <p>A component is a building block in React that defines a piece of the UI.</p>
        <li>How do you create a component in React?</li>
        <p>You can create a component in React by defining a JavaScript function or class.</p>
      </ul>
    </div>
  );
};

export default BasicQuestion;

export {};

