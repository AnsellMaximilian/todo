import React from 'react';

//AUTH
// import {auth} from '../service/firebase';

//CSS
import '../css/header.css';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    render(){
        return(
            <header id="app-header">
                <h1 id="app-title">{this.props.title}</h1>
                <nav id="navbar">
                    <ul id="navbar-list">
                        <li className="navbar-button">Sign Up</li>
                        <li className="navbar-button">Log In</li>
                        <li className="navbar-button">Log Out</li>
                    </ul>
                </nav>
                <div id="auth-form-container">
                    <div id="auth-form">
                        <h1 id="auth-form-title">Sign Up</h1>
                            <input placeholder="Email" type="email" name="email" className="auth-form-input"/>
                            <input placeholder="Password" type="password" name="password" className="auth-form-input"/>
                            <button id="auth-form-button">Sign Up</button>
                    </div>
                </div>
               
            </header>
        )
    }
}

export default Header;