import React, { Component } from "react";

class Secondcomponent extends Component {

    constructor(props) {
        super()
        // this.props.showlert = this.props.showlert.bind(this)
    }

    render() {
        const { showalertt } = this.props
        return (<div>
            <button onClick={() => showalertt('Lesley')}>Click</button>
        </div>
        )
    }
}

export default Secondcomponent