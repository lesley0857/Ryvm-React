import React, { Component } from "react";
import { Userconsumer } from "./userprovider";

class Consumerclass extends Component {

    constructor(props) {
        super()
    }

    render() {
        return (
            <Userconsumer>
                {value => { return <div>{value}</div> }}
            </Userconsumer>
        )
    }
}
export default Consumerclass