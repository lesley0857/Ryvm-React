import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import general from "../COntext/general_context";
import { useNavigate } from "react-router-dom";
import { Validator } from "./Utility_folders/form_validator";
import './CSS_folder/Login.css';
import LoginChecker from "./Utility_folders/Login_checker";
import baseUrl from "./Utility_folders/AxiosInstance";
import { alertbox_context } from "../COntext/alert_context";

function Loginpage() {
    const details = useContext(general)
    const alertbox_settings = useContext(alertbox_context)
    const [login_state, Setloginstate] = useState({ email: '', password: '' })
    const [message, Setmessage] = useState({ message: '' })
    const emailinputref = useRef()
    const password_ref = useRef()
    const navigate = useNavigate()
    const [loading, Setloading] = useState(null);

    const forgotPassword = (e) => {
        navigate('/Reset_Password_form')
    }

    const onchangehandler = (event) => {
        Setloginstate({
            email: emailinputref.current.value,
            password: password_ref.current.value
        })
    }

    const Submit_handler = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/api/token/`,
            { email: login_state.email, password: login_state.password, },
            {
                headers: {
                    "Content-Type": "application/json",
                    accept: 'application/json',
                }
            }
        ).then((res) => {
            Setloading(res.data.access);
            console.log(res.status)
            var encoded_refresh_token = btoa(res.data.refresh)
            var encoded_access_token = btoa(res.data.access)
            details.sett({ IsloggedIn: true, access: res.data.access, refresh: res.data.refresh, email: login_state.email });
            localStorage.setItem("refresh_token", encoded_refresh_token);
            localStorage.setItem("access_token", encoded_access_token);
            localStorage.setItem("email", login_state.email);
            Setmessage({ message: res.status })

        }).catch((error) => {
            if (error) {
                console.log(error.message)
                Setmessage({ message: error.message })
            }
        })
    }
    useEffect(() => {
        if (message.message === 200) {
            alertbox_settings.Setalert({ type: 'success', text: 'Successful Login' })
            navigate('/Profile', { replace: true })
        }
        if (message.message === 'Request failed with status code 401') {
            alertbox_settings.Setalert({ type: 'danger', text: 'Wrong username or Password' })
        }
        if (message.message === 'Request failed with status code 400') {
            alertbox_settings.Setalert({ type: 'danger', text: 'Bad Request' })
        }
        if (message.message === 'Network Error') {
            alertbox_settings.Setalert({ type: 'danger', text: 'Network Error' })
        }
    }, [message])


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
            <input className="forgot_pwd_bttn" onClick={forgotPassword} type="button" value='Forgot Password' />
        </div>
    )

}

export default LoginChecker(Loginpage)