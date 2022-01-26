import React, { Component } from 'react';
import Github from '../icons/github.png';
import LinkedIn from '../icons/linkedin.png';

class Footer extends Component {
    render() { 
        return (
            <div className='d-flex justify-content-center align-items-center fixed-bottom bg-black text-white user-select-none footer'>
                <a className='d-flex align-items-center text-white profile-link' href="https://www.github.com/DimensionalDragon/" target="_blank" rel='noreferrer'>
                    <img src={Github} alt="" />
                    <b>Github</b>
                </a>
                <a className=' d-flex align-items-center text-white profile-link' href="https://www.linkedin.com/in/andhika-satrya-980071228" target="_blank" rel='noreferrer'>
                    <img src={LinkedIn} alt="" />
                    <b>LinkedIn</b>
                </a>
            </div>
        );
    }
}
 
export default Footer;