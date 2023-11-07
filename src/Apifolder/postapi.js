import React, { Component } from "react";
import axios from "axios";

class Postapi extends Component {
    constructor() {
        super()
        this.state = { title: "", number: 0 }
    }
    submitfunc = e => {
        e.preventDefault()

        axios.post('https://jsonplaceholder.typicode.com/posts/', this.state)
            .then(response => { console.log(response) })
    }
    textedit = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const { title, number } = this.state
        return (
            <div>
                <form onSubmit={this.submitfunc}>
                    <input type="text" name='title' value={this.title} onChange={this.textedit} />
                    <input type="text" name='number' value={this.number} onChange={this.textedit} />
                    <button value="submit">Post</button>
                </form>
            </div>
        )
    }
}
export default Postapi