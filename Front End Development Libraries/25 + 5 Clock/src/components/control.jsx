import React, { Component } from 'react';

import '../playPauseButton.css';

class Control extends Component { 
    render() { 
        return (
            <div className='d-flex flex-row justify-content-between align-items-center mb-2 p-2 w-100 control-container'>
                <div style={{height: '100%', aspectRatio: '1/1', visibility: 'hidden'}}></div>
                <div role='button' className='playpause-container'>
                    <div className={'playpause-button' + (this.props.paused ? '' : ' paused')} id='start_stop' onClick={this.props.onToggle}></div>
                </div>
                <div role='button' className='d-flex justify-content-center align-items-center' id='reset' onClick={this.props.onReset} style={{height: '100%', aspectRatio: '1/1'}}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='75%' height='75%' viewBox='0 0 24 24' fill='white'><path d='M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z'/></svg>
                </div>
            </div>
        );
    }
}
 
export default Control;