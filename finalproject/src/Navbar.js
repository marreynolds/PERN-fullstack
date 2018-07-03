import React, { Component } from 'react';
// import Signup from './Signup';
import Link from 'react-router-dom/Link'
import Signup from './Signup';

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }
    

    handleSubmit = (event) => {
        console.log(this.state)
        event.preventDefault()
        fetch("http://localhost:3000/user/signin", {
            method: 'POST',
            body: JSON.stringify({User:this.state}),
            headers: new Headers({
                'Content-Type': 'application/json'
                })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.setToken(data.sessionToken)
        }) 
    }


    
    render() {
        return(
            <div>
                <nav id = 'navbar'>
                <form onSubmit = {this.handleSubmit}>
                    <p>Login</p>
                    <input name = 'username' placeholder = 'Username' onChange = {this.handleChange} />
                    <input name = 'password' placeholder = 'Password' onChange = {this.handleChange} />
                    <button id = 'btn' type = 'submit'>Submit</button>
                </form>
                    <p>If you don't have an account <Link to='/Signup'>Register Here</Link></p>
                    <button onClick = {this.props.clickLogout}>Logout</button>
                </nav>
                
            </div>
        )
    }
}

export default Navbar