import React, { Component } from 'react';

class Setter extends Component {
    render() { 
        return (
            <div className='d-flex flex-row justify-content-between align-items-center setter-container'>
                <div className='d-flex justify-content-center align-items-center dec' id={`${this.props.name.toLowerCase()}-decrement`} role='button' onClick={() => this.props.onDecrement(this.props.name)}><div>▼</div></div>
                <div className='d-flex flex-column align-items-center justify-content-between p-1'>
                    <p className='m-0 setter-label' id={`${this.props.name.toLowerCase()}-label`}>{`${this.props.name} Length`}</p>
                    <div id={`${this.props.name.toLowerCase()}-length`}>{this.props.value}</div>
                </div>
                <div className='d-flex justify-content-center align-items-center inc' id={`${this.props.name.toLowerCase()}-increment`} role='button' onClick={() => this.props.onIncrement(this.props.name)}>▲</div>
            </div>
        );
    }
}
 
export default Setter;