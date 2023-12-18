import axios from "axios";
import { useEffect, useRef, useState } from "react";
import '../CSS_folder/Email_verify.css';
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate, redirect } from "react-router-dom";
import baseUrl from "./AxiosInstance";

function Email_Verification() {
    const location = useLocation(null);
    const { hash, pathname, search } = location;
    const email = jwtDecode(pathname.slice(8,))['email']
    const navigate = useNavigate()
    const [verified_state, Set_verified_state] = useState({ message: '' })
    console.log(email)
    useEffect(() => {
        axios.post(`${baseUrl}/api/user/user_verify/${email}/`,
            { email: email },
            {
                headers: {
                    "Content-Type": "application/json",
                    accept: 'application/json',
                }
            }
        ).then((res) => {
            console.log(res)
            Set_verified_state({ message: res.data['message'] })
        }
        )
            .catch((error) => {
                console.log(error)
            })
    }, [])


    {
        if (verified_state.message === 'Email verified') {
            return (<>
                Email verified
            </>);
        } else {
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            navigate('/Profile')
        }
    }
}
export default Email_Verification