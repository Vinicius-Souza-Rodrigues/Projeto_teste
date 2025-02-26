import styles from "./layoutCSS/Navbar.module.css"

import foto from "../utils/img/logoFly.png"

function Navbar() {
    return (
        <div className={styles.campo}>
            <div>
                <img src={foto} alt="aaa" className={styles.imagem}/>
            </div>

            <nav>
                <ul className={styles.itens}>
                    <li>Home</li>
                    <li>prioridades</li>
                    <li>amigos</li>
                    <li>configurações</li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar