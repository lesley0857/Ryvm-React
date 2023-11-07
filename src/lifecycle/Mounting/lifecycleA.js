import React, { Component } from 'react'


class LifecycleA extends Component {

    constructor(props) {
        super(props)
        this.state = { name: 'Lesley' }
        console.log('constructor')
    }

    static getDerivedStateFromProps(props, state) {
        console.log(`derivedstate ${state.name}`)
        return null
    }
    changestate() {
        this.setState(
            (prevstate, props) => ({ name: 'Helen' }),
            () => console.log('callback from changestate')
        )
        console.log('function called')
    }
    shouldComponentUpdate() {
        console.log('shouldcomponentupdate')
        return true
    }
    componentDidUpdate(prevProp, prevState, snapshot) {
        console.log(`componentdid update ${prevState.name} ${prevProp} ${this.state.name} ${snapshot}`)
    }
    componentDidMount() {
        console.log('component did Mount')
    }
    render() {
        console.log("LifecycleA render")
        return (<div>Hello
            <button onClick={() => this.changestate()}>Click for LifeCycle A</button>
        </div>
        )
    }
}
export default LifecycleA