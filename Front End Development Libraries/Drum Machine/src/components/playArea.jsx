import React, { Component } from 'react';
import Drumpad from './drumpad';

const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

class PlayArea extends Component {
    render() { 
        return (
            <div className='p-2 buttons-container'>
                {keys.map((key, index) => <Drumpad key={index + 1} name={key} volume={this.props.volume} handleDisplayChange={this.props.handleDisplayChange} />)}
            </div>
        );
    }
}
 
export default PlayArea;