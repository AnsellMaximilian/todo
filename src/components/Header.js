import React from 'react';

import Navbar from './Navbar';

import '../css/header.css';

class Header extends React.Component {
    render(){
        return(
            <header id="app-header">
                <h1 id="app-title">{this.props.title}</h1>
                <Navbar/>
            </header>
        )
    }
}

export default Header;