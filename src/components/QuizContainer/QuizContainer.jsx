import Button from "../Button/Button";
import Options from "../Options/Options";
import styles from "./QuizContainer.module.css"
export default function QuizContainer (){
    return (
        <div className={styles.quizContainer}>
            <h3 className={styles.quiz}>This is question one</h3>
            <Options/>
            <Button/>
        </div>
    )
}

