import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "./AxiosInstance";
import Home from "../Profile";

// Prevents LoggedIn user from accessing the login page

const LoginChecker = CompForCheck => {
    const Verified_Comp = () => {
        const [check_state, Setcheckstate] = useState({
            IsloggedIn: false,
            refresh: atob(localStorage.getItem('refresh_token')),
        })
        const navigate = useNavigate()
        useEffect(() => {
            axios.post(`${baseUrl}/api/token/verify/`,
                { token: check_state.refresh },
                {
                    headers: {
                        "Content-Type": "application/json",
                        accept: 'application/json',
                    }
                }
            ).then((res) => {
                Setcheckstate({
                    ...check_state,
                    IsloggedIn: true
                });
                console.log(check_state.IsloggedIn)
                navigate('/Profile', { replace: true })

            }).catch((error) => {
                console.log(error);
                Setcheckstate({
                    ...check_state,
                    IsloggedIn: false
                });

            })
        }, []);

        if (check_state.IsloggedIn === true) {
            return (navigate('/Profile', { replace: true }))
        }
        else {
            return (<CompForCheck />)
        }
        // return (check_state.IsloggedIn ? navigate('/', { replace: true }) : <CompForCheck />)

    }
    return Verified_Comp
}

export default LoginChecker