import styles from './ResultPage.module.css'

export default function ResultPage({points, maxPossiblePoints, highScore, level, language, dispatch}) {
    const percentage = Math.round((points / maxPossiblePoints) * 100);
    
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";
  
    const isNewHighScore = points === highScore && points > 0;
  
    return (
      <section className={styles.result}>
        <h2> Quiz Completed!</h2>
        
        <p className={styles.score}>
        {emoji} You scored <strong>{points}</strong> out of {maxPossiblePoints}
        </p>
        
        <p className={styles.percentage}>
          That's {percentage}% correct!
        </p>
  
        <div className={styles.highScoreSection}>
          <h3>High Score</h3>
          <p className={styles.highScore}>
            {isNewHighScore ? "New high score! " : ""}
            {highScore} points for {language.toUpperCase()} ( Level: {level.toUpperCase()})
          </p>
          {isNewHighScore && <p className={styles.newRecord}>New record! 🎊</p>}
        </div>
  
        <button 
          className={styles.restart} 
          onClick={() => dispatch({type: "restart"})}
        >
          Try Again
        </button>
      </section>
    )
  }