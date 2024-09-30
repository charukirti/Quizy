import React, { useState } from 'react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false); // State to track if question is answered

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: "Mars"
    },
    // Add more questions here
  ];

  const handleOptionSelect = (option) => {
    if (!answered) { // Prevent changing the answer after one is selected
      setSelectedOption(option);
      setAnswered(true);
      if (option === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setAnswered(false); // Reset for the next question
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>Your score: {score} out of {questions.length}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{questions[currentQuestion].question}</h2>
      <ul>
        {questions[currentQuestion].options.map((option, index) => (
          <li key={index}>
            <button 
              onClick={() => handleOptionSelect(option)}
              style={{
                backgroundColor: answered
                  ? option === questions[currentQuestion].correctAnswer
                    ? 'green' // Correct option turns green
                    : 'red' // Incorrect options turn red
                  : 'white',
                color: answered ? 'white' : 'black',
                cursor: answered ? 'not-allowed' : 'pointer'
              }}
              disabled={answered} // Disable all buttons after an option is selected
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion} disabled={!selectedOption}>Next Question</button>
    </div>
  );
};

export default Quiz;
