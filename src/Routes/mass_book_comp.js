import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { findDOMNode } from "react-dom";
import userContext from "../COntext/payment_user_context";





const MassBookingComp = (props) => {
    const paymentUserContext = useContext(userContext);
    const buttons = props.buttons
    const user = props.Userprop
    const Count = props.Count
    const Setuser = props.SetUserprop
    const buttonref = useRef();
    const dateref = useRef();
    const timeref = useRef();
    const textref = useRef();

    const removeBooking = (e) => {
        textref.current.remove()
        dateref.current.remove()
        buttonref.current.remove()
        timeref.current.remove()
        Setuser({ ...user, amount: buttons.length * 100 })
    }
    const disableBackDate = () => {
        // var today = new Date().toISOString().split('T')[0];
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();
        return yyyy + "-" + mm + "-" + dd;
    }

    useEffect(() => {
        buttonref.current.addEventListener("click", removeBooking)
    }, [])



    return (
        <>
            <input type="date" min={disableBackDate()} ref={dateref} id={`date${buttons.length}`} />
            <input type="time" ref={timeref} id={`time${buttons.length}`} />
            <input type="text" ref={textref} id={`text${buttons.length}`} />
            <input type="button" value="X" ref={buttonref} className="btns" id={`button${buttons.length}`} />
        </>
    )
}
export default MassBookingComp