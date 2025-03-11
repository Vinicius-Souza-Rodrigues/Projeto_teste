import styles from "./MainCSS/CardTarefa.module.css"

function Cardtarefa( {name, state, description, date} ) {
    return (
        <div className={styles.campo}>
            <div className={styles.titulo}>
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