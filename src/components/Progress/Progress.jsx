import Timer from '../Timer/Timer';
import styles from './Progress.module.css'

export default function Progress ({currentQuestionIndex, numQuestions}){
    return (
        <div className={styles.progress}>
        <p >
           Question {currentQuestionIndex + 1} of {numQuestions} questions 
        </p>

        <Timer/>
        </div>
    )
}

