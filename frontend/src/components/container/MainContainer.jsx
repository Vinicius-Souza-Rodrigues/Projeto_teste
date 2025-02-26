import { Outlet } from "react-router-dom";

import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"

import styles from "./containerCss/container.module.css"

const MainContainer = () => {
    return (
        <div className="main-container">
            <Navbar />
            <div className={styles.base}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )    
}

export default MainContainer