import styles from "./WelcomePage.module.css";

export default function WelcomePage() {
  return (
    <section className={styles.welcome}>
      <h1>Welcome to the Quizy App</h1>
      <div className={styles.controls}>
        <div>
          <label htmlFor="category">Select Language: </label>
          <select name="category" id="category">
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
          </select>
        </div>
        <div>
          <label htmlFor="level">Select Level: </label>
          <select name="levels" id="level">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
      <button>Start Quiz</button>
    </section>
  );
}
