import { Outlet } from "react-router-dom";

const MainContainer = () => {
    return (
        <div className="auth-container">
            <Outlet />
        </div>
    )    
}

export default MainContainer