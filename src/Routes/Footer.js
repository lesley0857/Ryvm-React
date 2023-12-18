import { NavLink, Link } from "react-router-dom";
import React from "react";

function FooterComponent() {
    return (
        <div className="footerdiv">
            <div className="columnone">
                CATEGORIES
                <Link to='/' className="elements">Home</Link>
                <Link to='/About' className="elements">About</Link>
                <Link to='/map' className="elements">Find your way to church</Link>
                <Link to='/payment' className="elements">Book Mass</Link>
                <Link className="elements">about</Link>
                <Link className="elements">profile</Link>
                <small className="small">@ POWERED BY: LEOWEB SERVICES</small>
            </div>
            <div className="columntwo">
                ANNOUNCEMENTS
                <div className="elements">about</div>
                <div className="elements">profile</div>
            </div>
            <div className="columnthree">
                ACCOUNT DETAILS
                <div className="elements">about</div>
                <div className="elements">profile</div>
            </div>
        </div>

    )
}
export default FooterComponent