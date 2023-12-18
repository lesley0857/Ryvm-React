import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "./AxiosInstance";
import Profile_page from "../Profile";

const RegisterChecker = CompForCheck => {
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
                    IsloggedIn: true
                });
                console.log(check_state.IsloggedIn)
                // navigate('/', { replace: true })
                return (<Profile_page />)

            }).catch((error) => {
                console.log(error);
                Setcheckstate({
                    IsloggedIn: false
                });

            })
        }, []);

        if (check_state.IsloggedIn === true) {
            return (<Profile_page />)
            // return (navigate('/', { replace: true }))
        }
        else {
            return (<CompForCheck />)
        }
        // return (check_state.IsloggedIn ? navigate('/', { replace: true }) : <CompForCheck />)

    }
    return Verified_Comp
}

export default RegisterChecker