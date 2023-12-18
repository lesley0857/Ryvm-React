import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import FooterComponent from "./Footer";
import Logout from "./Logout";
import general from "../COntext/general_context";
import RegisterPage from "./Register";
import './CSS_folder/Basicpage.css';
import Clergy_page from "./clergy_slider";
import './CSS_folder/Footer.css';
import { useRef } from "react";
import Advert_page from "./Advert_slider";
import Map from "./map";
import Saint_page from "./saints_slider";
import ImageElement from "./background_image";
import Alert_Comp from "./Utility_folders/alert_comp";
import { alertbox_context } from "../COntext/alert_context";


function BasicPage(props) {
    const details = useContext(general)
    const menu_ref = useRef()
    const li_ref = useRef()
    const basic_page_ref = useRef()
    const navigate = useNavigate
    const toggle_ref = useRef()
    const sliders = document.querySelectorAll('.Carousel').forEach(el => {

        const items = el.querySelectorAll(".arrow1").forEach((item, i) => {
            item.addEventListener('click', () => { console.log(i) })
        })

        const itemss = el.querySelectorAll(".arrow2").forEach((item, i) => {
            item.addEventListener('click', () => { console.log(i) })
        })
    })

    function map_display() {
        navigate('/map')
    }
    function toggle() {
        if (window.screen.width < '576') {
            console.log(window.screen.width)
            menu_ref.current.style.display = 'none';
            menu_ref.current.style.backGround = 'black'
        }
        else { console.log(window.screen.width) }
    }

    function menu() {
        toggle_ref.current.classList.add('clicked');
        setTimeout(() => toggle_ref.current.classList.remove('clicked'), 500);
        if (menu_ref.current.style.display === 'none') {
            menu_ref.current.style.display = 'inline-flex';
        }
        else {
            menu_ref.current.style.display = 'none';
        }
    }
    return (

        <div className="BasicPage" ref={basic_page_ref}>
            <Alert_Comp />
            <div className="top">
                <div className="church_logo_desktop">LOGO</div>
                <div className="logo_title nowrap">ARCHANGEL'S CATHOLIC CHURCH </div>
            </div>
            <nav className="nav">
                <div className="alignlogo">
                    <div className="toggle_menu" onClick={menu} ref={toggle_ref}></div>
                    <div className="aligncolumn">
                        <div className="mobile_church_title ">ARCHANGEL'S CATHOLIC CHURCH </div>
                        <div className="church_logo_mobile">LOGO</div>
                    </div>
                </div>
                <ol ref={menu_ref} className="list">
                    <li onClick={toggle}><Link to='/'>Home</Link></li>
                    <li onClick={toggle}><Link to='/About'>About</Link></li>
                    {details.sta.IsloggedIn ? <li onClick={toggle}><Link to='/Profile'>Profile</Link></li> : null}
                    <li onClick={toggle}>{details.sta.IsloggedIn ? <Link to='/Logout'>Logout</Link>
                        : <Link to='/Login'>Login</Link>}</li>
                    {details.sta.IsloggedIn ? null : <li ref={li_ref} onClick={toggle}><Link to='/Register'>Register</Link></li>}
                </ol>

            </nav>
            <Link to='/map'><div className="find_church">Find Church</div></Link>
            <div className="find_church_one">Find Church</div>
            <div className="other_components">
                {props.children}
            </div>
            <div className="clergy_cont">
                <div className="holder">
                    <div className="word_holder"><b><i>SAINT(s) OF THE DAY</i></b></div>
                    <Saint_page />
                </div>
                <div className="holder">
                    <div className="word_holder"><b><i>PASTORAL TEAM</i></b></div>
                    <Clergy_page />
                </div>
            </div>
            <section className="advert_cont">
                <Advert_page />
            </section>
            <section>
                <FooterComponent />
            </section>
        </div>


    )
}
export default BasicPage