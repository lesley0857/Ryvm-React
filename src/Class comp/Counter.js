import React, { Component } from "react";

class Countclass extends Component {

    constructor(props) {
        super()
        this.state = { count: 0 + Number(props.num), }
        this.increment = this.increment.bind(this)
        this.inputref = React.createRef()
    }

    increment() {
        this.setState((prevstate, props) => ({
            count: prevstate.count + Number(props.num)
        }),
            () => console.log(this.state.count)
        )
    }

    componentDidMount() {
        console.log(this.inputref.current.console)
        this.inputref.current.focus()
    }

    render() {
        const { num, name } = this.props // destructure of props
        return (
            <React.Fragment>
                <span>
                    <label>REF:Input highligh</label>
                </span>
                <input type="text" ref={this.inputref} />
                Count-{this.state.count}
                <button onClick={this.increment}>Click to increment</button>
                {/* <button onClick={() => this.increment()}>Click to increment</button> */}
            </React.Fragment>
        )
    }
}

export default Countclass