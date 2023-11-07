import React, { Component } from "react";
import axios from "axios";

class Apiposts extends Component {
    constructor() {
        super()
        this.state = { posts: [], errorlog: false }
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts/')
            .then(response => { this.setState({ posts: response.data }) })
            .catch(error => { this.setState({ errorlog: true }) })

        // axios.get('http://127.0.0.1:8000/api/member/3/')
        //     .then((response) => { console.log(response.data) })
        //     .then((error) => { console.log(error) })
    }
    render() {
        const { posts, errorlog } = this.state
        return (
            <div>
                <label>A list of Posts </label>

                {posts.length ? posts.map(post => <div key={post.id}>{post.id}</div>) : null}

                {errorlog ? <div>Error</div> : null}
            </div>
        )
    }
}
export default Apiposts