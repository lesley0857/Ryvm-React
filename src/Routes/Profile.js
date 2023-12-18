import React, { useContext, useEffect, useState, createContext } from "react";
import general from "../COntext/general_context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SocietyPage from "./Society";
import ProductsPage from "./Products";
import "../Routes/CSS_folder/Profile.css";
import Checker from "./Utility_folders/Authorization_check";
import baseUrl from "./Utility_folders/AxiosInstance";


function Profile_page() {
    const APIKEY = 'API key 1 = AIzaSyAepZYyBoiaCCNd-SJkd7ChgHeGd3fpEbY'
    const details = useContext(general)
    const navigate = useNavigate()
    const [userstate, Setuserstate] = useState({ name: '', id: '', email: '', image: '' })
    const [societies, Setsocieties] = useState([])
    const [socc, Setsocc] = useState([])

    console.log(details.sta.IsloggedIn)
    console.log('Home')


    useEffect(() => {
        axios.get(
            `${baseUrl}/api/user/user_detail/${details.sta.email}/`,
            {
                headers: {
                    Authorization: atob(localStorage.getItem('access_token')) ?
                        `Bearer ${atob(localStorage.getItem('access_token'))}` :
                        null, //loginpage you were never signedin on device.
                    "Content-Type": "application/json",
                    accept: 'application/json',
                }
            }

        ).then((res) => {
            console.log(`here ${res.data.Societies}`)
            Setuserstate({
                name: `${res.data.User_datails.lastname} ${res.data.User_datails.firstname}`.toUpperCase(),
                id: res.data.User_datails.id,
                email: res.data.User_datails.email,
                image: res.data.User_datails.profile_pic
            });
            console.log(userstate.name);
            Setsocieties(res.data.Societies);
            console.log(`state ${societies}`);
        }).catch((error) => {
            console.log(`error${error}`);
        })
    }, [])
    return (
        <div className="Profile">
            <div className="first_line">
                <img className="image" src={userstate.image} height='200' width='200' />

                <div className="profile_holder">
                    <div>Welcome <span className="nowrap">{userstate.name}</span></div>
                    {/* <span className="nowrap border">Remeber God Loves You</span> */}
                </div>
            </div>

            <div className="second_line">
                <div className="list_of_scoieties">List of Socities you belong to:</div>
                {societies.map((soc) =>

                    <div className="societies_tile" key={soc.id} onClick={() => {
                        localStorage.setItem(`${soc.Society_name}`, soc.Society_name);
                        navigate(`/society/${soc.Society_name}`)
                    }}>

                        {soc.Society_name}
                        <img className="image" height='200' width='200' src={soc.profile_pic} />


                    </div>
                )}
            </div>

        </div>
    )

}
export default Checker(Profile_page)