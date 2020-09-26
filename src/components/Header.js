import React from 'react';

class Header extends React.Component {
    render(){
        return(
            <header id="app-header">
                <h1>{this.props.title}</h1>
            </header>
        )
    }
}

export default Header;