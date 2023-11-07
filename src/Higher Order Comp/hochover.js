import React, { Component } from "react";
import HOC from "./hocfunc";

class HOC_hover extends Component {
    render() {
        return (<div>
            <label onMouseOver={this.props.counterfunc}>HOC HOVER{this.props.countervalue}</label>
        </div>)
    }
}
export default HOC(HOC_hover)