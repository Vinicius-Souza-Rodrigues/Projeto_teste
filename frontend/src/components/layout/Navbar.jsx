import styles from "./layoutCSS/Navbar.module.css"

import { Link } from "react-router-dom";

import foto from "../utils/img/logoFly.png"

function Navbar() {
    return (
        <div className={styles.campo}>
            <div>
                <img src={foto} alt="aaa" className={styles.imagem}/>
            </div>

            <nav>
                <ul className={styles.itens}>
                    <li><Link to="/main" className={styles.links}>Home</Link></li>
                    <li><Link to="/tarefa/criar" className={styles.links}>Criar</Link></li>
                    <li><Link to="/configuracoes" className={styles.links}>Configurações</Link></li>
                    <li><Link to="/logout" className={styles.links}>Logout</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar