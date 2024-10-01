import styles from "./Button.module.css";

export default function Button({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className={styles.next}
        onClick={() => dispatch({ type: "next_question" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "finish_quiz" })}
        className={styles.next}
      >
        Finish
      </button>
    );
}
