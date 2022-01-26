import React, { Component } from 'react';
import Volume from './volume';
import '../slider.css';

class ControlPanel extends Component {
    render() {
        return (
            <div className='d-flex flex-column align-items-center justify-content-between align-self-center p-2 control-panel'>
                <div className='d-flex justify-content-center align-items-center text-light mb-3 display-screen' id='display'>
                    {this.props.display}
                </div>
                <div className='d-flex flex-column align-items-center mt-3 volume'>
                    <Volume volume={this.props.volume} handleVolumeChange={this.props.handleVolumeChange} />
                </div>
            </div>
        );
    }
}
 
export default ControlPanel;