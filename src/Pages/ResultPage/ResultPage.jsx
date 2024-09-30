import styles from './ResultPage.module.css'

export default function ResultPage (){
    // let emoji;
    // if (percentage === 100) emoji = "🥇";
    // if (percentage >= 80 && percentage < 100) emoji = "🎉";
    // if (percentage >= 50 && percentage < 80) emoji = "🙃";
    // if (percentage >= 0 && percentage < 50) emoji = "🤨";
    // if (percentage === 0) emoji = "🤦‍♂️";
    return (
        <section>
            <p className={styles.result}>
                <span>
                🤨
                </span>
                You scored <strong>23</strong> out of 100
            </p>

            <p className={styles.highscore}>High Score : 74</p>


            <button className={styles.restart}>Restart the Quiz</button>
        </section>
    )
}

