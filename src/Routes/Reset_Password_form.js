import axios from "axios";
import { useRef, useState } from "react";
import baseUrl from "./Utility_folders/AxiosInstance";
import Checker from "./Utility_folders/Authorization_check";
import LoginChecker from "./Utility_folders/Login_checker";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert_Comp from "./Utility_folders/alert_comp";
import { variants } from "./Utility_folders/variants";

const Reset_Password_form_Page = () => {
    const [message, Setmessage] = useState({ message: '' })
    const emailinputref = useRef()
    const [emailInput, SetemailInput] = useState({ email: '' });
    const navigate = useNavigate()
    const onchangehandler = (event) => {
        SetemailInput({
            email: emailinputref?.current.value
        })
    }
    const Submit_handler = (event) => {
        event.preventDefault();
        axios.post(`${baseUrl}/api/user/reset_password_form/`,
            { email: emailInput.email, check: "check email for reset_password" },
            {
                headers: {
                    "Content-Type": "application/json",
                    accept: 'application/json',
                }
            }
        ).then((res) => { Setmessage({ message: res.data.message }) })
            .catch((error) => { Setmessage({ message: error.message }) }
            );
    }



    return (
        <>
            {/* {message.message === 'Invalid account' ? <Alert_Comp value={{}}></Alert_Comp> : null}
            {message.message === null ? null : null} */}
            {/* {message.message === 'Valid account' ? <Alert_Comp variant={variants(message.message)}></Alert_Comp> : null} */}
            <h2>Please Input your Account's Email Address</h2>
            <form onSubmit={Submit_handler} className="form_element">
                <div className="fields_block">
                    <label className="fields">Email</label>
                    <input className="fields" type="text" onChange={onchangehandler} ref={emailinputref} />
                </div>
                <input type="Submit" value='Submit' />
            </form>
        </>
    )
}
export default Reset_Password_form_Page