import React, { Component } from 'react';

class QuoteBox extends Component {
    render() { 
        return (
            <div className='d-flex flex-column p-3' id='quote-box'>
                <p id='text' style={{color: this.props.textColor}}>{this.props.quote}</p>
                <p className='align-self-end' id='author' style={{color: this.props.textColor}}>{this.props.author}</p>
                <div className='d-flex flex-row justify-content-between buttons'>
                    <a className='twitter-button' id='tweet-quote' href='https://twitter.com/intent/tweet' rel='noreferrer' target='_blank' style={{backgroundColor: this.props.BGColor}}>
                        <img className='twitter' src='https://icon-library.com/images/twitter-icon-white-png/twitter-icon-white-png-12.jpg' alt='twt' />
                    </a>
                    <button id='new-quote' onClick={this.props.handleReset} style={{backgroundColor: this.props.BGColor}}>New Quote</button>
                </div>
            </div>
        );
    }
}
 
export default QuoteBox;