import React, { Component } from 'react';
import PlayArea from './playArea';
import ControlPanel from './controlPanel';

const displayMap = {
    Q: 'Shaker',
    W: 'Punchy Kick',
    E: 'Side Stick',
    A: 'Snare',
    S: 'Heater',
    D: 'Open HH',
    Z: 'Kick n\' Hat',
    X: 'Kick',
    C: 'Closed HH'
}

class Drum extends Component {
    state = {
        display: '',
        volume: 0.6
    }

    handleVolumeChange = event => this.setState({display: `Volume: ${Math.round(event.target.value * 100)}`, volume: event.target.value});
    handleDisplayChange = pressedKey => this.setState({display: displayMap[pressedKey]});

    render() { 
        return (
            <div className='d-flex align-items-center p-2' id='drum-machine'>
                <PlayArea volume={this.state.volume} handleDisplayChange={this.handleDisplayChange} />
                <ControlPanel volume={this.state.volume} display={this.state.display} handleVolumeChange={this.handleVolumeChange} />
            </div>
        );
    }
}
 
export default Drum;