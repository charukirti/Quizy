import styles from "./WelcomePage.module.css";

export default function WelcomePage({ level, language, dispatch }) {
  function handleSelectLanguage(e) {
    dispatch({ type: "select_language", payload: e.target.value });
  }

  function handleSelectLevel(e) {
    dispatch({ type: "set_level", payload: e.target.value });
  }

  function handleStartQuiz() {
    dispatch({type: 'start_quiz'});
  }
  return (
    <section className={styles.welcome}>
      <h1>Welcome to the Quizy App</h1>
      <div className={styles.controls}>
        <div>
          <label htmlFor="language">Select Language: </label>
          <select name="language" id="language" onChange={handleSelectLanguage}>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
          </select>
        </div>
        <div>
          <label htmlFor="level">Select Level: </label>
          <select name="levels" id="level" onChange={handleSelectLevel}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </section>
  );
}
