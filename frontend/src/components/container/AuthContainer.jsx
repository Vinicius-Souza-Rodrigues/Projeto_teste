import { Outlet } from "react-router-dom";

const AuthContainer = () => {
    return (
        <div className="auth-container">
            <Outlet />
        </div>
    )    
}

export default AuthContainer