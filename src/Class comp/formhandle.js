import React, { Component } from 'react'
import '../Stylefiles/formstyle.css'

class Formjs extends Component {

    constructor(props) {
        super(props)
        this.state = { name: '' }
    }

    Namechange = (event) => {
        this.setState({ name: event.target.value })
    }
    render() {
        return (
            <form>
                <input type="text"
                    value={this.state.name}
                    onChange={this.Namechange}
                    className='primary' />
            </form>
        )
    }
}
export default Formjs