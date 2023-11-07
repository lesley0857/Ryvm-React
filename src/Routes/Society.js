import { NavLink, Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import specific_socities from "./Home";
import axios from "axios";

function SocietyPage(prop) {
    const society_name = localStorage.getItem("soc")
    console.log(society_name)
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/society/${society_name}/`)
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