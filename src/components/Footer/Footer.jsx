import Button from "../Button/Button";
import Timer from "../Timer/Timer";
import styles from "./Footer.module.css";

export default function Footer({dispatch, answer, currentQuestionIndex, numQuestions}) {
  return (
    <footer className={styles.footer}>
      
      <p>
      Created with ♥️ by <a href="https://github.com/charukirti">Charukirti</a>
      </p>

      <Button
        dispatch={dispatch}
        answer={answer}
        index={currentQuestionIndex}
        numQuestions={numQuestions}
      />
    </footer>
  );
}
