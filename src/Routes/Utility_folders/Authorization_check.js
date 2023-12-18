import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "./AxiosInstance";
import { alertbox_context } from "../../COntext/alert_context";



const Checker = CompForCheck => {
    const Verified_Comp = () => {
        const [generalstate, Setgeneralstate] = useState({
            IsloggedIn: false,
            NotRegistered: false,
            access: atob(localStorage.getItem('access_token')),
            refresh: atob(localStorage.getItem('refresh_token')),
            email: localStorage.getItem('email'),
        })
        const navigate = useNavigate()
        useEffect(() => {
            axios.post(`${baseUrl}/api/token/refresh/`,
                { refresh: atob(localStorage.getItem('refresh_token')) },
                {
                    headers: {
                        "Content-Type": "application/json",
                        accept: 'application/json',
                    }
                }
            ).then((res) => {
                console.log(res.data.access);
                Setgeneralstate({
                    ...generalstate,
                    access: res.data.access,
                    IsloggedIn: true
                });
                localStorage.setItem('access_token', btoa(res.data.access))
            })
                .catch((error) => {
                    Setgeneralstate({
                        ...generalstate,
                        IsloggedIn: false
                    });
                })
        }, [])

        return (<>
            {generalstate.IsloggedIn ? <CompForCheck />
                : navigate('/Login', { replace: true })

            }
        </>
        )

    }
    return Verified_Comp
}

export default Checker