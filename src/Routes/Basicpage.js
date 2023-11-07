import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import FooterComponent from "./Footer";
import Logout from "./Logout";
import general from "../COntext/general_context";
import RegisterPage from "./Register";
import './CSS_folder/Basicpage.css';
import Clergy_page from "./clergy_slider";



import { useRef } from "react";
import Advert_page from "./Advert_slider";


function BasicPage(props) {
    const details = useContext(general)
    const menu_ref = useRef()
    const li_ref = useRef()
    const basic_page_ref = useRef()
    const toggle_ref = useRef()
    const sliders = document.querySelectorAll('.Carousel').forEach(el => {

        const items = el.querySelectorAll(".arrow1").forEach((item, i) => {
            item.addEventListener('click', () => { console.log(i) })
        })

        const itemss = el.querySelectorAll(".arrow2").forEach((item, i) => {
            item.addEventListener('click', () => { console.log(i) })
        })


    })


    function toggle() {
        if (window.screen.width < '576') {
            console.log(window.screen.width)
            menu_ref.current.style.display = 'none';
        }
        else { console.log(window.screen.width) }
    }

    function menu() {
        toggle_ref.current.classList.add('clicked');
        setTimeout(() => toggle_ref.current.classList.remove('clicked'), 1000);
        if (menu_ref.current.style.display === 'none') {
            menu_ref.current.style.display = 'inline-flex';
        }
        else {
            menu_ref.current.style.display = 'none';
        }
    }
    return (

        <div className="BasicPage" ref={basic_page_ref}>
            <nav className="nav">
                <div className="toggle_menu" onClick={menu} ref={toggle_ref}></div>
                <ol ref={menu_ref} className="list">
                    <li onClick={toggle}><Link to='/'>Home</Link></li>
                    <li onClick={toggle}><Link to='/About'>About</Link></li>
                    <li onClick={toggle}><Link to='/Product'>Product</Link></li>
                    <li onClick={toggle}>{details.sta.IsloggedIn ? <Link to='/Logout'>Logout</Link>
                        : <Link to='/Login'>Login</Link>}</li>
                    <li ref={li_ref} onClick={toggle}>{details.sta.IsloggedIn ? null : <Link to='/Register'>Register</Link>}</li>
                </ol>

            </nav>
            <div className="find_church">Find Church</div>
            <div className="find_church_one">Find Church</div>
            <div className="other_components">
                {props.children}
            </div>
            <Clergy_page />
            <Advert_page />
            <footer>
                <FooterComponent></FooterComponent>
            </footer>
        </div>


    )
}
export default BasicPage