import Button from "../Button/Button";
import Options from "../Options/Options";
import styles from "./QuizContainer.module.css";
export default function QuizContainer({
  filterdQuestions,
  answer,
  dispatch,
  currentQuestionIndex,
  numQuestions,
}) {
  return (
    <div className={styles.quizContainer}>
      <h3 className={styles.quiz}>{filterdQuestions.question}</h3>
      <Options
        filterdQuestions={filterdQuestions}
        answer={answer}
        dispatch={dispatch}
      />

      {/* <Button
        dispatch={dispatch}
        answer={answer}
        index={currentQuestionIndex}
        numQuestions={numQuestions}
      /> */}
    </div>
  );
}
