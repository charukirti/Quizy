import styles from './Error.module.css'

export default function Error (){
    return (
        <p className={styles.error_msg}>
            There was an error while fetching questions 😢
        </p>
    )
}

