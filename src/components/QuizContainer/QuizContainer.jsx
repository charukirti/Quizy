import Button from "../Button/Button";
import Options from "../Options/Options";
import styles from "./QuizContainer.module.css";
export default function QuizContainer({ filterdQuestions, answer, dispatch }) {
  return (
    <div className={styles.quizContainer}>
      <h3 className={styles.quiz}>{filterdQuestions.question}</h3>
      <Options
        filterdQuestions={filterdQuestions}
        answer={answer}
        dispatch={dispatch}
      />
      <Button />
    </div>
  );
}
