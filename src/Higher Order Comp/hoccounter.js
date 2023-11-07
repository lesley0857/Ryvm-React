import React, { Component } from "react";
import HOC from "./hocfunc";

class HOC_counter extends Component {
    render() {
        return (<div>
            <button onClick={this.props.counterfunc}>
                HOC COUNTER   {this.props.countervalue}
                {this.props.remainingprop}
            </button>

        </div>)
    }
}
export default HOC(HOC_counter)