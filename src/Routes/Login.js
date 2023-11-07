import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import general from "../COntext/general_context";
import { useNavigate } from "react-router-dom";
import { Validator } from "./form_validator";
import './CSS_folder/Login.css';
import ProductsPage from "./Products";



function Loginpage() {
    const details = useContext(general)
    const [login_state, Setloginstate] = useState({ email: '', password: '' })
    const emailinputref = useRef()
    const password_ref = useRef()
    const navigate = useNavigate()
    const [loading, Setloading] = useState(null);



    const onchangehandler = (event) => {
        Setloginstate({
            email: emailinputref.current.value,
            password: password_ref.current.value
        })
    }

    const Submit_handler = (e) => {
        e.preventDefault()
        const selector = Validator(login_state.email, login_state.password)
        console.log(selector)
        switch (selector) {
            case "@ missing": alert('e.g: example.mail.com only(. and _) is accepted');
                break;
            case "spec missing": alert("please add a special character to your password");
                break;
            default: axios.post('http://127.0.0.1:8000/api/token/',
                { email: login_state.email, password: login_state.password, }
            ).then((res) => {
                Setloading(res);
                details.sett({ IsloggedIn: true, access: res.data.access, refresh: res.data.refresh, email: login_state.email });
                localStorage.setItem("refresh_token", res.data.refresh);
                localStorage.setItem("access_token", res.data.access);
                localStorage.setItem("email", login_state.email);
                //navigate('/', { replace: true })

            }).catch((error) => {
                if (error) {
                    alert('Username or Password Incorrect')
                }
            })
        }
    }


    if (details.sta.IsloggedIn === false) {
        return (
            <div className="form">
                <form onSubmit={Submit_handler} className="form_element">
                    <div className="fields_block">
                        <label className="fields">Email</label>
                        <input className="fields" type="text" onChange={onchangehandler} ref={emailinputref} />
                    </div>
                    <div className="fields_block">
                        <label className="fields">Password</label>
                        <input className="fields" type="password" ref={password_ref} onChange={onchangehandler} />
                    </div>
                    <input type="Submit" className="Submit_button" />
                </form>
            </div>
        )
    }
    else {
        navigate('/', { replace: true });

    }




}

export default Loginpage