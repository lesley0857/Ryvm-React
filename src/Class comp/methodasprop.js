import React, { Component } from "react";
import Secondcomponent from "./Component2";

class Passmethodasprop extends Component {

    constructor(props) {
        super()
        this.state = {}
        this.showalert = this.showalert.bind(this)
    }

    showalert(ChildName) {
        alert(`Hello Parent from ${ChildName}`)
    }

    render() {
        return (
            <div>
                <Secondcomponent showalertt={this.showalert}></Secondcomponent>
            </div>
        )
    }
}

export default Passmethodasprop