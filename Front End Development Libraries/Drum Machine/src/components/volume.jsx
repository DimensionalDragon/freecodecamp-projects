import React, { Component } from 'react';

class Volume extends Component {
    render() { 
        return (
            <div className='d-flex flex-column align-items-center'>
                <label htmlFor='volume'>Volume</label>
                <input type='range' id='volume' min={0} max={1} step={0.01} onChange={this.props.handleVolumeChange} value={this.props.volume}></input>
            </div>
        );
    }
}
 
export default Volume;