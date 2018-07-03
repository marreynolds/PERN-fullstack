import React, { Component } from 'react'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            email: ''
        }
    }

    handleChage = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        console.log()
        fetch("http://localhost:3000/user", {
            method: 'POST',
            body: JSON.stringify({ User: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.setToken(data.sessionToken)
        })
        event.preventDefault()
    }


    render() {
        return (
            <div>
                <h1>Register Here to Start Tracking Your Gym Progress</h1>
                <form onSubmit={this.handleSubmit}>
                    <ul>
                        <li><input name='firstName' placeholder='First Name' onChange={this.handleChage} /></li>
                        <li><input name='lastName' placeholder='Last Name' onChange={this.handleChage} /></li>
                        <li><input name='userName' placeholder='Username' onChange={this.handleChage} /></li>
                        <li><input name='password' placeholder='Password' onChange={this.handleChage} /></li>
                        <li><input name='email' placeholder='Email' onChange={this.handleChage} /></li>
                    </ul>
                    <button id='btn'>Submit</button>
                </form>
                <h3>Now that you're registered; login from the top of the screen!</h3>


            </div>
        )
    }
}

export default Signup