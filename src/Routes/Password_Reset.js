import axios from "axios";
import { useRef, useState } from "react";
import baseUrl from "./Utility_folders/AxiosInstance";
import Checker from "./Utility_folders/Authorization_check";
import LoginChecker from "./Utility_folders/Login_checker";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Password_Reset_Page = () => {
    const location = useLocation();
    const { pathname } = location;
    const token = pathname.slice(16)
    const email = jwtDecode(token)['email']
    const password1Ref = useRef()
    const password2Ref = useRef()
    const [PasswordState, SetPasswordState] = useState({ password1: '', password2: '' });
    const onchangehandler = (event) => {
        SetPasswordState({
            password1: password1Ref?.current.value,
            password2: password2Ref?.current.value
        })
    }
    const Submit_handler = async (event) => {
        event.preventDefault()
        await axios.post(`${baseUrl}/api/user/reset_password_form/`,
            { email: email, password1: PasswordState.password1, password2: PasswordState.password2, check: "Reset_Password" },
            {
                headers: {
                    "Content-Type": "application/json",
                    accept: 'application/json',
                }
            }
        ).then((res) => { console.log(res) })
            .catch((error) => { console.log(error) }
            )
    }
    return (
        <>
            <h2>Please Input your Account's Email Address</h2>
            <form onSubmit={Submit_handler} className="form_element">
                <div className="fields_block">
                    <label className="fields">New Password</label>
                    <input className="fields" type="password" onChange={onchangehandler} ref={password1Ref} />
                </div>
                <div className="fields_block">
                    <label className="fields">Confirm Password</label>
                    <input className="fields" type="password" onChange={onchangehandler} ref={password2Ref} />
                </div>
                <input type="Submit" value='Submit' />
            </form>
        </>
    )
}
export default Password_Reset_Page