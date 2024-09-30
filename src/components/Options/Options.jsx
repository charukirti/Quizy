import styles from "./Options.module.css";

export default function Options({ filterdQuestions, answer, dispatch }) {
  const isAnswered = answer !== null;

  return (
    <div className={styles.options}>
      {filterdQuestions.options.map((option, index) => (
        <button
          key={index}
          className={
            isAnswered
              ? index === filterdQuestions.correctAnswer
                ? "correct"
                : "wrong"
              : ""
          }
          disabled={isAnswered}
          onClick={() => dispatch({type: 'new_answer',  payload: index})}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
