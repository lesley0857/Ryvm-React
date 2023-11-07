import React, { useContext, useEffect, useState, createContext } from "react";

import Yourname from '../functional comp/name';
import Yournamefromclass from '../Class comp/name';
import Propsfunc from '../functional comp/propsdisplay';
import Welcome from '../Class comp/stateexample';
import Countclass from '../Class comp/Counter';
import Passmethodasprop from '../Class comp/methodasprop';
import Listofpersons from '../functional comp/Listrenderingpersons';
import Formjs from '../Class comp/formhandle';
import LifecycleA from '../lifecycle/Mounting/lifecycleA';
import Portal from '../functional comp/portals';
import CheckText from '../ErrorBoundary/Textchecker';
import Errorcatcher from '../ErrorBoundary/errorcatcher';
import HOC_counter from '../Higher Order Comp/hoccounter';
import HOC_hover from '../Higher Order Comp/hochover';
import { Userprovider } from '../COntext/userprovider';
import Consumerclass from '../COntext/consumer';
import Apiposts from '../Apifolder/apicall';
import Postapi from '../Apifolder/postapi';
import Counterfunc from '../React_Hooks/counter';
import general from "../COntext/general_context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SocietyPage from "./Society";
import ProductsPage from "./Products";

export const specific_socities = createContext()

function HomePage() {
    const prov = specific_socities.Provider
    const details = useContext(general)
    const navigate = useNavigate()
    const [userstate, Setuserstate] = useState({ name: '', id: '', email: '', image: '' })
    const [societies, Setsocieties] = useState([])
    const [socc, Setsocc] = useState([])

    console.log(details.sta.IsloggedIn)
    useEffect(() => {
        if (details.sta.IsloggedIn === true) {
            axios.get(
                `http://127.0.0.1:8000/api/user/user_detail/${details.sta.email}/`,
                {
                    headers: {
                        Authorization: localStorage.getItem('access_token') ?
                            `Bearer ${localStorage.getItem('access_token')}` :
                            null, //loginpage you were never signedin on device.
                        "Content-Type": "application/json",
                        accept: 'application/json',
                    }
                }

            ).then((res) => {
                console.log(res)
                Setuserstate({
                    name: `${res.data.User_datails.lastname} ${res.data.User_datails.firstname}`.toUpperCase(),
                    id: res.data.User_datails.id,
                    email: res.data.User_datails.email,
                    image: res.data.User_datails.profile_pic
                });
                Setsocieties(res.data.list_of_society_pictures);
                console.log(`state ${societies}`);
            }).catch((error) => {
                console.log(`error${error}`);
            })


        }
        else { navigate('/Login') }
    }, [details.sta]);


    return (
        <div>
            <div>Welcome {userstate.name}</div>
            {userstate.id}
            {userstate.email}
            <img height='200' width='200' src={`http://127.0.0.1:8000${userstate.image}`} />
            <div>List of Socities you belong to:</div>
            {societies.map((soc) =>

                <div key={soc.id} onClick={() => {
                    localStorage.setItem(`${soc.Society_name}`, soc.Society_name);
                    navigate(`/Society/${soc.Society_name}`)
                }}>

                    {soc.Society_name}
                    <img height='200' width='200' src={`http://127.0.0.1:8000${soc.profile_pic}`} />


                </div>
            )}

        </div>
    )


    //     return (
    //         <div className="App">
    //             <div>
    //                 <Userprovider value='Lesley from Context'>
    //                     <Consumerclass />
    //                 </Userprovider>

    //                 <Userprovider value='Context from hooks'>
    //                     <Counterfunc />
    //                 </Userprovider>

    //                 {/* <Apiposts></Apiposts>
    //                 <Postapi></Postapi>

    //                 <LifecycleA></LifecycleA>
    //                 <Countclass num='2' name='hillz'></Countclass>
    //                 <Portal></Portal>
    //                 <Errorcatcher>
    //                     <CheckText></CheckText>
    //                 </Errorcatcher>
    //                 <HOC_counter remainingprop='Lesley'></HOC_counter>
    //                 <HOC_hover></HOC_hover> */}
    //                 {/* <Formjs />
    //   <Countclass num='2' name='hillz'></Countclass>
    //   <Welcome name='Welcome Nweke Lesley'></Welcome>
    //   <Passmethodasprop></Passmethodasprop>
    //   <Listofpersons></Listofpersons> */}
    //                 {/* <Yourname />
    //   <Yournamefromclass />
    //   <Yournamefromclass name='Lesley from a class prop'>Inner Html from Propclass</Yournamefromclass>
    //   <Propsfunc name="Lesley from a func property">Inner Html from Props</Propsfunc>
    //   <Propsfunc name="Oluoma from reusable Propsfunc" />
    //   <Propsfunc name="Oluoma from class button"><button>Button</button></Propsfunc> */}
    //             </div>
    //         </div>


    //     )
}
export default HomePage