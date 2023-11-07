import React, { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import { Userconsumer, Usercontext } from "../COntext/userprovider";
import { click } from "@testing-library/user-event/dist/click";

const intialstate = 0
const reducerfunc = (state, action) => {
    switch (action) {
        case 'increment': return state + 1
        case 'decrement': return state - 1
        case 'reset': return intialstate
        default: return state
    }
}

function Counterfunc() {
    const [count, Setcount] = useState(0)
    const [secondcount, Setseconfcount] = useState(0)
    const [names, Setname] = useState({ firstname: '', lastname: '' })
    const [listval, Setlistval] = useState('Input a val')
    const [listt, Setlist] = useState([])
    const [formname, Setformname] = useState('')
    const [callvalue, Setcallvalue] = useState([])

    const [newcountstate, dispatch_handler] = useReducer(reducerfunc, intialstate)
    // if you want use effect to re-render only when there 
    // is a change in the State. then you must add
    // the state as a second parameter to the 
    // useeffect function i.e useEffect(effect,[state])

    // To call the useEffect only once, you pass
    // an empty array as a second parameter i.e useEffect(effect,[])

    // if you want to unmount a component you will need return a function
    //     that would unmount the component in the effect function i.e as commented below
    const tick = () => {
        Setseconfcount(prevcount => prevcount + 1)
    }
    const forminput = (e) => {
        Setformname(e.target.value)
    }

    useEffect(() => {
        document.title = `use_effect click ${count}`;
        //return () => {
        //window.removeEventListener('mouseover', function)
        //}
    }, [count])


    let removelist = (event, item) => {
        const remove_and_display_element = document.getElementById(item.val)
        let index = () => {
            for (let i = 0; i <= listt.length; i++) {
                console.log(i)
                if (listt[i].val === item.val) { console.log(`found${listt[i].val}`); return i }
            }
        }

        listt.splice(index(), 1)
        Setlist([...listt])
        console.log(listt)
    }

    // useEffect(() => {
    //     const interval = setInterval(tick, 2000)
    //     return (
    //         () => { clearInterval(interval) }
    //     )
    // }, [])
    const makerequest = (e) => {
        e.preventDefault()
        axios.get('https://jsonplaceholder.typicode.com/posts/')
            .then((response) => { Setcallvalue(response.data); console.log(response.data) })
            .catch((error) => { console.log(`Error ${error}`) })
    }
    const postapi = (e) => {
        e.preventDefault()
        axios.post('https://jsonplaceholder.typicode.com/posts/', { formname })
            .then((response) => { console.log(response.status) })
            .catch((error) => { console.log(`Error ${error}`) })
    }

    //useEffect(() => { postapi(new MouseEvent('click')) }, [])

    const a_value_from_contrast = useContext(Usercontext)

    return (
        <div>
            <div>
                <input type="button" value='Increment' onClick={() => dispatch_handler('increment')} />
                <input type="button" value="Decrement" onClick={() => dispatch_handler('decrement')} />
                <input type="button" value="Reset" onClick={() => dispatch_handler("reset")} />
                <h2>{newcountstate}</h2>
            </div>

            {a_value_from_contrast}
            <form onSubmit={makerequest}>
                <div>
                    <input value={formname} type="text" onChange={forminput} />
                    <input type="submit" value='Get Call' />
                    <input type="button" value='Post' onClick={postapi} />
                    <h2>{callvalue.map(title => (
                        <li key={title.id}>{title.id}</li>
                    ))}</h2>
                </div>
            </form>
            <div>
                <input type="text"
                    value={listval}
                    onChange={e => { Setlistval(e.target.value) }}
                />
                <input type="button" value='Update list'
                    onClick={() => {
                        Setlist([...listt, { id: listt.length, val: listval }]); console.log(listt)
                    }}
                />
                <div >{listt.map(item => <div id={item.val} key={item.val}>
                    <button name={item.val} onClick={(e) => removelist(e, item)}>Remove</button>
                    <h3>{item.val} {item.id}</h3>
                </div>)}
                </div>
            </div>
            <input value={count} type='button'
                onClick={() => {
                    Setcount((prevState) =>
                        prevState + 1
                    ); console.log('prevState')
                }}
            />
            <div>{secondcount}</div>

            <input type='text' value={names.firstname}
                onChange={e => { Setname({ ...names, firstname: e.target.value }) }}
            />
            <input type='text' value={names.lastname} onChange={e => { Setname({ ...names, lastname: e.target.value }) }} />
            <h1>{names.firstname}</h1>
            <h1>{names.lastname}</h1>
        </div>


    )

}
export default Counterfunc