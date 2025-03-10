import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Logout() {

    const navigate = useNavigate()

    useEffect(() => {
        navigate("/login")
    })

    return (
        <>
        
        </>
    )
}

export default Logout