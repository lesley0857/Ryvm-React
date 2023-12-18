import React, { useContext, useEffect, useRef, useState } from "react";
import '../CSS_folder/alertbox.css';
import { variants } from "./variants";
import { alertbox_context } from "../../COntext/alert_context";
import { type } from "@testing-library/user-event/dist/type";


const Alert_Comp = () => {
    const alertbox_settings = useContext(alertbox_context)
    const alertboxref = useRef();
    useEffect(() => {
        if (alertboxref.current) { clearTimeout(alertboxref.current); }
        alertboxref.current = setTimeout(() => { alertbox_settings.Setalert({ type: null }) }, 3500)
    }, [alertbox_settings.alert.type])
    return (
        !alertbox_settings.alert.type ? null :
            <div className="alertbox" style={variants[0][`${alertbox_settings.alert.type}`]} ref={alertboxref}>
                {alertbox_settings.alert.text}
            </div>
    )

}
export default Alert_Comp