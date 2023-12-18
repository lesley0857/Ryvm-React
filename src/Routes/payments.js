import axios, { Axios } from "axios";
import { error } from "jquery";
import React, { createElement, useContext, useEffect, useRef, useState } from "react";
import { PaystackButton, } from 'react-paystack'
import PaystackPop from '@paystack/inline-js';
import { alertbox_context } from "../COntext/alert_context";
import { json } from "react-router-dom";
import MassBookingComp from "./mass_book_comp";
import Checker from "./Utility_folders/Authorization_check";
import baseUrl from "./Utility_folders/AxiosInstance";
import ReactDOM, { createRoot } from "react-dom/client";
import { createContext } from "react";
import userContext from "../COntext/payment_user_context";

const Test_Secret = "sk_test_cedcc30b30e823877217c7013edf878c395fca3a"
const Test_Public = "pk_test_a614a43132cc55cd2e0c880b0729a5f552674de0"

const Paymentpage = () => {
    const setalert = useContext(alertbox_context)
    const [count, Setcount] = useState(1)
    const [inputList, setInputList] = useState([])
    const [bookings, Setbookings] = useState({})
    const [valuess, setvalues] = useState([]);
    const [user, Setuser] = useState({ email: '', amount: 0, firstname: '', lastname: '', description: 'Mass Booking' })
    const textRef = useRef()
    const amountRef = useRef()
    const firstnameRef = useRef()
    const lastnameRef = useRef()
    const descriptionRef = useRef()
    const signedInUser = localStorage.getItem('email')
    const list_of_mass_bookings = []

    const buttons = document.getElementsByClassName("btns");
    var btnsArr = Array.prototype.slice.call(buttons);

    const getvalues = (e) => {
        Setuser({
            email: signedInUser,
            amount: amountRef.current.value,
            lastname: lastnameRef.current.value,
            firstname: firstnameRef.current.value,
            description: descriptionRef.current.value,

        })
    }


    const AddMoreMasses = (e) => {
        Setcount(prev => prev + 1)
        Setuser({ ...user, amount: Math.abs(100 * buttons.length) + 100 })
        e.preventDefault()
        const books = document.getElementById('books');
        const element = <MassBookingComp Userprop={user} Count={count} SetUserprop={Setuser} buttons={buttons} key={buttons.length}></MassBookingComp>
        setInputList(inputList.concat(element))
    }

    function payWithPaystack(e) {
        var paymentForm = document.getElementById('paymentForm');
        const total_amount = (100 * buttons.length)
        paymentForm.addEventListener('submit', payWithPaystack, false);
        e.preventDefault();
        if (descriptionRef.current.value === 'Mass Booking') {
            if (amountRef.current.value >= total_amount) {
                console.log(btnsArr)
                for (const btn in btnsArr) {
                    const id = `${btnsArr[btn].id}`
                    const real_id = id.split('n')[1]
                    list_of_mass_bookings.push(document.getElementById(`date${real_id}`)?.value)
                    list_of_mass_bookings.push(document.getElementById(`time${real_id}`)?.value)
                    list_of_mass_bookings.push(document.getElementById(`text${real_id}`)?.value)
                }
                const paystack = new PaystackPop()
                paystack.newTransaction({
                    key: Test_Public,
                    amount: user.amount * 100,
                    email: signedInUser,
                    onSuccess(transaction) {
                        axios.get(`https://api.paystack.co/transaction/verify/${transaction.reference}`,
                            {
                                headers: {
                                    "Authorization": `Bearer ${Test_Secret}`,
                                }
                            })
                            .then((res) => {
                                if (res.data.status === true) {
                                    setalert.Setalert({ type: 'success', text: 'Payment Verified' })
                                    axios.post(`${baseUrl}/api/paystack_payment/`,
                                        {
                                            'email': signedInUser,
                                            'reference_id': transaction.reference,
                                            'amount': user.amount,
                                            'description': user.amount,
                                            'lastName': user.lastname,
                                            'firstName': user.firstname,
                                            'other_fields': list_of_mass_bookings
                                        },
                                        {
                                            headers: {
                                                "Content-Type": "application/json",
                                                accept: 'application/json',
                                            }
                                        }).then((response) => { console.log(response) })
                                        .catch((error) => { console.log(error) });
                                    user.email = '';
                                    user.amount = '';
                                }

                            })
                            .catch((error) => {
                                console.log(error); user.email = '';
                                user.amount = '';
                            })
                    },
                    onCancel() {
                        setalert.Setalert({ type: 'danger', text: 'Transaction cancelled' });
                        user.email = '';
                        user.amount = '';
                    }

                })
            }
            else { setalert.Setalert({ type: 'warning', text: 'Insufficient amount for number of Mass bookings' }) }
        } else {
            const paystack = new PaystackPop()
            paystack.newTransaction({
                key: Test_Public,
                amount: user.amount * 100,
                email: user.email,
                onSuccess(transaction) {
                    console.log(transaction)
                    axios.get(`https://api.paystack.co/transaction/verify/${transaction.reference}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${Test_Secret}`,
                            }
                        })
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.status === true) {
                                setalert.Setalert({ type: 'success', text: 'Payment Verified' })
                                axios.post(`${baseUrl}/api/paystack_payment/`,
                                    {
                                        'email': user.email,
                                        'reference_id': transaction.reference,
                                        'amount': user.amount,
                                        'description': user.amount,
                                        'lastName': user.lastname,
                                        'firstName': user.firstname,
                                    },
                                    {
                                        headers: {
                                            "Content-Type": "application/json",
                                            accept: 'application/json',
                                        }
                                    }).then((response) => { console.log(response) })
                                    .catch((error) => { console.log(error) });
                                user.email = '';
                                user.amount = '';
                            }

                        })
                        .catch((error) => {
                            console.log(error);
                            user.email = '';
                            user.amount = '';
                        })
                },
                onCancel() {
                    alert('Transaction cancelled');
                    user.email = '';
                    user.amount = '';
                }

            })
        }
    }


    return (
        <>
            <form id="paymentForm">
                <div className="form-group">
                    <label >Amount</label>
                    <input value={user.amount} ref={amountRef} onChange={getvalues} type="tel" id="amount" required />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input ref={firstnameRef} onChange={getvalues} type="text" id="first-name" />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input ref={lastnameRef} onChange={getvalues} type="text" id="last-name" />
                </div>
                <div>
                    <label>Payment Description</label>
                    <select ref={descriptionRef} onChange={getvalues}>
                        <option value='Mass Booking'>Mass Booking</option>
                        <option value='Harvest Redemption'>Harvest Redemption</option>
                        <option value='Tithe'>Tithe</option>
                        <option value='Help The Poor'>Help The Poor</option>
                    </select>
                </div>
                {user.description === 'Mass Booking' ? <button onClick={AddMoreMasses}>Click to book more masses</button> : null}
                {user.description === 'Mass Booking' ? <div id="books">{inputList}</div> : null}
                <div className="form-submit">
                    <input type="submit" onClick={payWithPaystack} />
                </div>
            </form>
        </>
    )
}
export const PaymentUserContextProvider = ({ children }) => {
    return (
        <userContext.Provider value={{ "user": Paymentpage.user, "setuser": Paymentpage.Setuser }}>
            {children}
        </userContext.Provider>
    )
}
export default Checker(Paymentpage)
