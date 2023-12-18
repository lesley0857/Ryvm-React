import { useContext, useEffect } from "react";
import general from "../COntext/general_context";
import { useNavigate } from "react-router-dom";


function Logout() {
    const details = useContext(general)
    const navigate = useNavigate()


    details.sett({
        email: '',
        IsloggedIn: false,
        access: '',
        refresh: '',
    });

    localStorage.setItem("access_token", btoa(details.sta.access))
    localStorage.setItem("refresh_token", btoa(details.sta.refresh))
    localStorage.setItem("email", details.sta.email)

    navigate('/Login', { replace: true })
    window.location.reload();
}
export default Logout