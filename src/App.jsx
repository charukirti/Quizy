import { useState, useEffect, useReducer } from "react";

import Header from "./components/Header/Header";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import QuizContainer from "./components/QuizContainer/QuizContainer";
import Progress from "./components/Progress/Progress";
import ResultPage from "./Pages/ResultPage/ResultPage";
import Loader from "./components/Loader/Loader";
import Button from "./components/Button/Button";

const BASE_URL = `http://localhost:3000`;

const initialState = {
  allQuestions: [],
  filterdQuestions: [],
  level: "easy",
  language: "html",
  status: "loading",
  error: null,
  currentQuestionIndex: 0,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  answer: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "data_recived":
      // console.log(action.payload)
      return { ...state, status: "ready", allQuestions: action.payload };
    case "data_failed":
      return { ...state, status: "error" };
    case "select_language":
      return { ...state, language: action.payload };
    case "set_level":
      return { ...state, level: action.payload };

    case "start_quiz":
      const filterdQuestions = state.allQuestions.filter(
        (question) =>
          question.language.toLowerCase() === state.language.toLowerCase() &&
          question.level.toLowerCase() === state.level.toLowerCase()
      );
      return {
        ...state,
        status: "active",
        filterdQuestions,
        currentQuestionIndex: 0,
        points: 0,
      };

    case "new_answer":
      // const currentQuestion =
      //   state.filterdQuestions[state.currentQuestionIndex];
      // const isCorrect = action.payload === currentQuestion.correctAnswer;
      const question = state.filterdQuestions.at(state.currentQuestionIndex);
      console.log(action.payload);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctAnswer
            ? state.points + question.score
            : state.points,
      };

    case "next_question":
      console.log(state.currentQuestionIndex);
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };

    case "finish_quiz":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "restart":
      return {
        ...initialState,
        allQuestions: state.allQuestions,
        status: "ready",
      };
  }
}

export default function App() {
  const [
    {
      allQuestions,
      filterdQuestions,
      level,
      language,
      status,
      points,
      currentQuestionIndex,
      error,
      answer,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const response = await fetch(`${BASE_URL}/questions`);
      if (!response.ok) {
        throw new Error("There was an error while fetching questions");
      }
      const data = await response.json();
      // console.log(data)
      dispatch({ type: "data_recived", payload: data });
    } catch (error) {
      dispatch({ type: "data_failed", payload: error.message });
    } finally {
      console.log("did something");
    }
  }

  const numQuestions = allQuestions.length;
  console.log(numQuestions);
  const maxPossiblePoints = allQuestions.reduce(
    (prev, curr) => prev + curr.score,
    0
  );
  console.log(maxPossiblePoints);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "ready" && (
          <WelcomePage level={level} language={language} dispatch={dispatch} />
        )}
        {/* <Loader/> */}

        {status === "active" && (
          <>
            <Progress
              currentQuestionIndex={currentQuestionIndex}
              numQuestions={numQuestions}
            />
            <QuizContainer
              filterdQuestions={filterdQuestions[currentQuestionIndex]}
              answer={answer}
              dispatch={dispatch}
            />
            <Button
              dispatch={dispatch}
              answer={answer}
              index={currentQuestionIndex}
              numQuestions={numQuestions}
            />
          </>
        )}
      </Main>
      <Footer />
    </div>
  );
}
