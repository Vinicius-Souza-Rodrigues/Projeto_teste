import styles from "./MainCSS/main.module.css"

function Cardtarefa( {name, state, description, date} ) {
    return (
        <div className={styles.campo}>
            <div>
                <h3>{name}</h3>
            </div>

            <div>
                <p>{description}</p>
            </div>

            <div>
                <p>{state}</p>

                <p>{date}</p>
            </div>
        </div>
    )
}

export default Cardtarefa