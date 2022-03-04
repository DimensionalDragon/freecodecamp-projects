import React, { Component } from 'react';
import Calculator from './calculator';

class Body extends Component {
    render() {
        return (
            <div className='d-flex justify-content-center align-items-center vw-100 calculator-container'>
                <Calculator />
            </div>
        );
    }
}
 
export default Body;