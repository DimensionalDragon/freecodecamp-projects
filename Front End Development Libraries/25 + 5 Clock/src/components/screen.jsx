import React, { Component } from 'react';

class Screen extends Component {
    render() { 
        return (
            <div className='d-flex flex-column flex-fill justify-content-center align-items-center w-100 screen-container'>
                <h4 className='m-1' id='timer-label'>{this.props.name}</h4>
                <div className='screen-clock' id='time-left'>
                    {(this.props.minutes < 10 ? `0${this.props.minutes}` : this.props.minutes) + ':' + (this.props.seconds < 10 ? `0${this.props.seconds}` : this.props.seconds)}
                </div>
            </div>
        );
    }
}
 
export default Screen;