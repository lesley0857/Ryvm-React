import React, { Component } from "react";

class Welcome extends Component {

    constructor() {
        super()
        this.state = { message: 'Welcome Visitor', Isloggedin: false }
    }

    changemessage(aname) {
        this.setState({
            message: aname,
            Isloggedin: true
        })
    }

    render() {
        if (this.state.Isloggedin) {
            return (
                <div>
                    {this.state.message}
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.state.message}
                    <button onClick={() => this.changemessage(this.props.name)}>Subscribe</button>
                </div>
            )
        }
    }
}

export default Welcome