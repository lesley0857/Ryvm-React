import React, { Component } from "react";


const HOC = (OriginalComp) => {
    class NewComp extends Component {
        constructor() {
            super()
            this.state = { count: 0 }
        }

        incrementfunction = () => {
            this.setState(prevstate => {
                return { count: prevstate.count + 1 }
            })
        }

        render() {
            return (
                <OriginalComp counterfunc={this.incrementfunction}
                    countervalue={this.state.count} {... this.props}>

                </OriginalComp>
            )
        }
    }
    return (
        NewComp
    )
}
export default HOC