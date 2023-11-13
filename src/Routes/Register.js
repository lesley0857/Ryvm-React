import React, { useEffect, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import { Validator } from "./form_validator";
import './CSS_folder/Register.css';

function RegisterPage() {
    const navigate = useNavigate()
    const [user, Setuser] = useState({
        email: '',
        firstname: '',
        lastname: '',
        phonenumber: '',
        alternativenumber: '',
        maritalstatus: '',
        next_of_kin: '',
        next_of_kin_number: '',
        profile_picture: '',
        password: '',

    })
    const emailinput_ref = useRef()
    const firstname_ref = useRef()
    const lastname_ref = useRef()
    const phone_number_ref = useRef()
    const alternative_number_ref = useRef()
    const marital_status_ref = useRef()
    const next_of_kin_ref = useRef()
    const next_of_kin_number_ref = useRef()
    const profile_picture_ref = useRef()
    const password_ref = useRef()

    const onchangehandler = () => {
        Setuser({
            email: emailinput_ref.current.value,
            firstname: firstname_ref.current.value,
            lastname: lastname_ref.current.value,
            phonenumber: phone_number_ref.current.value,
            alternativenumber: alternative_number_ref.current.value,
            maritalstatus: marital_status_ref.current.value,
            nextofkin: next_of_kin_ref.current.value,
            nextofkinnumber: next_of_kin_number_ref.current.value,
            profilepicture: profile_picture_ref.current.files[0],
            password: password_ref.current.value,
        })
    }
    const Submit_handler = (e) => {
        e.preventDefault()
        const selector = Validator(user.email, user.password, user.phonenumber)
        switch (selector) {
            case "@ missing": alert('e.g: example.mail.com only(. and _) is accepted');
                break;
            case "spec missing": alert("please add a special character to your password");
                break;
            case "wrong phone pattern": alert("wrong phone pattern");
                break;
            default: axios.post('http://13.49.225.0:8000/api/user/register_user/',
                {
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone_number: user.phonenumber,
                    alternative_number: user.alternativenumber,
                    marital_status: user.maritalstatus,
                    next_of_kin: user.nextofkin,
                    next_of_kin_number: user.nextofkinnumber,
                    profile_pic: profile_picture_ref.current.files[0],
                    password: user.password,
                }, { headers: { 'Content-Type': "multipart/form-data" } }
            )
                .then((res) => {
                    console.log(res.data);
                    navigate('/Login', { replace: true })
                })
                .catch((error) => { console.log(error) });
        }


    }

    return (
        <div className="form">
            <form onSubmit={Submit_handler}>
                <div className="fields_block">
                    <label className="fields">Email</label>
                    <input className="fields" type="text" onChange={onchangehandler} ref={emailinput_ref} />
                </div>

                <div className="fields_block">
                    <label className="fields">First name</label>
                    <input className="fields input_fields" type="text" ref={firstname_ref} onChange={onchangehandler} />
                </div>

                <div className="fields_block">
                    <label className="fields">Last name</label>
                    <input className="fields" type="text" ref={lastname_ref} onChange={onchangehandler} />
                </div>

                <div className="fields_block">
                    <label className="fields">Phone Number</label>
                    <input className="fields input_fields" type="number" ref={phone_number_ref} onChange={onchangehandler} />
                </div>

                <div className="fields_block">
                    <label className="fields nowrap">Alternative Number</label>
                    <input className="fields input_fields" type="number" ref={alternative_number_ref} onChange={onchangehandler} />
                </div>

                <div className="fields_block">
                    <label className="fields" htmlFor="Marital_Status">Marital Status</label>
                    <select className="fields" ref={marital_status_ref} id="Marital_Status" name="Choice">
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>

                <div className="fields_block">
                    <label className="fields">Next of Kin</label>
                    <input className="fields" type="text" ref={next_of_kin_ref} onChange={onchangehandler} />
                </div>

                <div className="fields_block">
                    <label className="fields">Next of Kin Number</label>
                    <input className="fields input_fields" type="number" ref={next_of_kin_number_ref} onChange={onchangehandler} />
                </div>

                <div className="fields_block">
                    <label className="fields">Profile Picture</label>
                    <input className="fields" type="file" accept="image/*" ref={profile_picture_ref} onChange={onchangehandler} />
                </div>

                <div className="fields_block">
                    <label className="fields">Password</label>
                    <input className="fields" type="password" ref={password_ref} onChange={onchangehandler} />
                </div>


                <input className="Submit_button" type="Submit" />

            </form>

        </div>
    )
}

export default RegisterPage