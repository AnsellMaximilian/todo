import React from 'react';

class Navbar extends React.Component {
    render(){
        return(
            <nav id="navbar">
                <ul id="navbar-list">
                    <li className="navbar-button">Sign Up</li>
                    <li className="navbar-button">Log In</li>
                    <li className="navbar-button">Log Out</li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;