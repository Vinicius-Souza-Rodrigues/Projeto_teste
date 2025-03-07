import styles from "./utilsCSS/SubmitButtom.module.css"

function SubmitButtom( {text} ) {
    return (
        <div>
            <button type="submit" className={styles.campo}>{text}</button>
        </div>
    )
}

export default SubmitButtom