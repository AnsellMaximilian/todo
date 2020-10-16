import React from 'react';

//AUTH
import {auth} from '../service/firebase';

//CSS
import '../css/header.css';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            hideForm: true,
            formMode: '',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                // this.setState({ userLoggedIn: true})
                this.updateAuthStatus(true);
            }else{
                // this.setState({ userLoggedIn: false});
                this.updateAuthStatus(false);
            }
        });
    }

    updateAuthStatus = (value) => {
        this.props.updateAuthStatus(value);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        if(this.state.formMode === "Sign Up"){
            this.signUp();
        }else if(this.state.formMode === "Log In"){
            this.signIn();
        }
        this.setState({
            email: '',
            password: '',
            hideForm: true,
            formMode: ''
        })
        
    }

    signUp = () => {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCred => {
            console.log("Sign Up Successful");
        });
    }

    signIn = () => {
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => console.log("Log In Successful"));
    }

    logOut = () => {
        auth.signOut()
        .then(() => console.log("Logged Out"));
    }

    openForm = (mode) => {
        if(mode === "signUp"){
            this.setState({
                hideForm: false,
                formMode: "Sign Up"
            })
        }else if(mode === "logIn"){
            this.setState({
                hideForm: false,
                formMode: "Log In"
            })
        }else if(mode === "logOut"){
            this.logOut();
        }
    }


    render(){
        const authLinks = this.props.userLoggedIn ? 
            <li key="logOut" className="navbar-button" onClick={() => this.openForm("logOut")}>Log Out</li> : 

            [<li key="signUp" className="navbar-button" onClick={() => this.openForm("signUp")}>Sign Up</li>,
            <li key="signIn" className="navbar-button" onClick={() => this.openForm("logIn")}>Log In</li>];

        return(
            <header id="app-header">
                <h1 id="app-title"><i className="fas fa-list"></i> {this.props.title}</h1>
                <nav id="navbar">
                    <ul id="navbar-list">
                        {authLinks}
                    </ul>
                </nav>
                <div id="auth-form-container" style={{display: this.state.hideForm ? "none" : "block"}}>
                    <div id="auth-form">
                        <i className="fas fa-times" id="close-auth-form" onClick={() => this.setState({hideForm: true, formMode: ''})}></i>
                        <h1 id="auth-form-title">{this.state.formMode}</h1>
                            <input 
                                placeholder="Email" 
                                value={this.state.email} 
                                type="email" name="email" 
                                className="auth-form-input"
                                onChange={this.handleChange}
                            />
                            <input
                                placeholder="Password" 
                                value={this.state.password} 
                                type="password" name="password" 
                                className="auth-form-input"
                                onChange={this.handleChange}
                            />
                            <button id="auth-form-button" onClick={this.handleSubmit}>{this.state.formMode}</button>
                    </div>
                </div>
               
            </header>
        )
    }
}

export default Header;