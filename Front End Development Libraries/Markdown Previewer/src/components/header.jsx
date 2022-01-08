import React, { Component } from 'react';

class Header extends Component {
    render() { 
        return (
            <div className='d-flex flex-column justify-content-center align-items-center sticky-top bg-black text-white user-select-none title'>
                <h1 className='m-0'>Markdown Previewer</h1>
                <p className='m-0'>By DimensionalDragon</p>
            </div>
        );
    }
}
 
export default Header;