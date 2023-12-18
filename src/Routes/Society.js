import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import specific_socities from "./Profile";
import axios from "axios";

function SocietyPage(prop) {
    const location = useLocation();
    const { hash, pathname, search } = location;
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api${pathname}/`)
            .then((res) => { console.log(res) })
            .catch((error) => { console.log(error) })

    }, [])

    return (
        <>
            SocietyPage
        </>

    )
}
export default SocietyPage