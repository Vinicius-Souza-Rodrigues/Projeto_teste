import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import styles from "./containerCss/container.module.css";

function isTokenValid(token) {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
}

const MainContainer = ( {customClass} ) => {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    toast.info("Login de acesso expirado!");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.main_container}>
      <Navbar />
      <div className={styles[customClass]}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainContainer;
