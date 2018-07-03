import React from 'react'
// import Navbar from './Navbar';
import Link from 'react-router-dom/Link'

let Home = (props) => {
    return (
        <div>
            {/* <Navbar setToken = {props.setToken} clickLogout = {props.clickLogout}></Navbar> */}
            <h1>Welcome to the Best Fitness Tracker on the Web!</h1>
            <button><Link to= '/Signup'>Register Here</Link></button>
        </div>

    )
}

export default Home