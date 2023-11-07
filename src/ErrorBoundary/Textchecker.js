import React, { Component } from "react";

class CheckText extends Component {
    constructor() {
        super()
        this.state = { textt: '' }
    }
    componentDidUpdate() {
        if (this.state.textt === 'abc') {
            throw new Error('Error abc')
        }
    }
    txtchangfunc = (event) => {
        this.setState({ textt: event.target.value })
    }
    render() {
        return (<div>
            <label>Error Boundary Checker</label>
            <input type="text" value={this.state.textt} onChange={this.txtchangfunc} />
        </div>)
    }
}
export default CheckText