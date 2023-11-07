import React, { Component } from "react";

class Errorcatcher extends Component {
    constructor() {
        super()
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    // componentDidCatch(error, info) {

    // }
    render() {
        if (this.state.hasError) {
            return <div>Something is Wrong</div>
        }
        return this.props.children
    }
}
export default Errorcatcher