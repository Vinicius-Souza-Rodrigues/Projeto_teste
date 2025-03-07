import { Outlet } from "react-router-dom";

import styles from "./containerCss/container.module.css"

const AuthContainer = () => {
    return (
        <div className={styles.auth_container}>
            <Outlet />
        </div>
    )    
}

export default AuthContainer