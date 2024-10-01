import { useEffect, useReducer } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import QuizContainer from "./components/QuizContainer/QuizContainer";
import Progress from "./components/Progress/Progress";
import ResultPage from "./Pages/ResultPage/ResultPage";
import Loader from "./components/Loader/Loader";
import Error from "./components/Error/Error";

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
  highScores: {
    easy: { html: 0, css: 0, javascript: 0, react: 0 },
    medium: { html: 0, css: 0, javascript: 0, react: 0 },
    hard: { html: 0, css: 0, javascript: 0, react: 0 },
  },
  secondsRemaining: null,
  answer: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "data_recived":
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
      const question = state.filterdQuestions.at(state.currentQuestionIndex);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctAnswer
            ? state.points + question.score
            : state.points,
      };

    case "next_question":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };

    case "finish_quiz":
      const currentScore = state.points;
      const currentLevel = state.level;
      const currentLanguage = state.language;

      if (!state.highScores) {
        state.highScores = {
          easy: { html: 0, css: 0, javascript: 0 },
          medium: { html: 0, css: 0, javascript: 0 },
          hard: { html: 0, css: 0, javascript: 0 },
        };
      }

      if (!state.highScores[currentLevel]) {
        state.highScores[currentLevel] = { html: 0, css: 0, javascript: 0 };
      }

      if (state.highScores[currentLevel][currentLanguage] === undefined) {
        state.highScores[currentLevel][currentLanguage] = 0;
      }

      const currentHighScore = state.highScores[currentLevel][currentLanguage];

      const newHighScore =
        currentScore > currentHighScore ? currentScore : currentHighScore;

      return {
        ...state,
        status: "finished",
        highScores: {
          ...state.highscores,
          [currentLevel]: {
            ...state.highScores[currentLevel],
            [currentLanguage]: newHighScore,
          },
        },
      };

    case "restart":
      return {
        ...initialState,
        allQuestions: state.allQuestions,
        highScores: state.highScores,
        status: "ready",
      };
  }
}

export default function App() {
  const [
    {
      filterdQuestions,
      level,
      language,
      status,
      points,
      currentQuestionIndex,
      error,
      answer,
      highScores,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const response = await fetch(`${BASE_URL}/questions`);
      const data = await response.json();

      dispatch({ type: "data_recived", payload: data });
    } catch (error) {
      dispatch({ type: "data_failed" });
    }
  }

  const numQuestions = filterdQuestions.length;

  const maxPossiblePoints = filterdQuestions.reduce(
    (prev, curr) => prev + curr.score,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <WelcomePage level={level} language={language} dispatch={dispatch} />
        )}

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
              currentQuestionIndex={currentQuestionIndex}
              numQuestions={numQuestions}
            />
            <Footer
              numQuestions={numQuestions}
              currentQuestionIndex={currentQuestionIndex}
              answer={answer}
              dispatch={dispatch}
            />
          </>
        )}

        {status === "finished" && (
          <ResultPage
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
            highScore={highScores[level][language]}
            level={level}
            language={language}
          />
        )}
      </Main>
    </div>
  );
}
