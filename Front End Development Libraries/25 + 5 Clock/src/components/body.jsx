import React, { Component } from 'react';
import Clock from './clock';

class Body extends Component {
    render() {
        return (
            <div className='d-flex justify-content-center align-items-center vw-100 body-container'>
                <Clock />
            </div>
        );
    }
}
 
export default Body;