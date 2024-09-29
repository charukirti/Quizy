import Timer from '../Timer/Timer';
import styles from './Progress.module.css'

export default function Progress (){
    return (
        <div className={styles.progress}>
        <p >
           Question 1 of n 
        </p>

        <Timer/>
        </div>
    )
}

