import React, { Component } from 'react';
import Drum from './drum';

class Body extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div className='d-flex justify-content-center align-items-center vw-100 vh-100 bg-light drum'>
                <Drum />
            </div>
        );
    }
}
 
export default Body;