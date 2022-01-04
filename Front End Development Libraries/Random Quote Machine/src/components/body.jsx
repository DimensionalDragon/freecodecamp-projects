import React, { Component } from 'react';
import Axios from 'axios';
import QuoteBox from './quoteBox';

const RANDOM_COLORS = ['rgb(71, 46, 50)', 'rgb(115, 168, 87)', 'rgb(155, 89, 182)', 'rgb(231, 76, 60)', 'rgb(44, 62, 80)', 'rgb(119, 177, 169)'];

class Body extends Component {
    constructor() {
        super();
        this.state = {
            BGColor: RANDOM_COLORS[0],
            TextColor: RANDOM_COLORS[0],
            quote: '',
            author: ''
        }
    }

    resetQuote = async () => {
        this.setState({textColor: 'whitesmoke'});
        const {data} = await Axios.get('https://api.quotable.io/random');
        const {content, author} = data;
        console.log(data);
        const randomColor = RANDOM_COLORS[Math.round(Math.random() * 5)];
        this.setState({BGColor: randomColor, textColor: randomColor, quote: content, author: '- ' + author});
    }

    async componentDidMount() {
        await this.resetQuote();
    }
    
    handleReset = async () => {
        await this.resetQuote();
    }

    render() {
        return (
            <div className='d-flex justify-content-center align-items-center vw-100 vh-100 page' style={{backgroundColor: this.state.BGColor}}>
                <QuoteBox
                    BGColor={this.state.BGColor}
                    textColor={this.state.textColor}
                    quote={this.state.quote}
                    author={this.state.author}
                    handleReset={this.handleReset}>
                </QuoteBox>
            </div>
        );
    }
}
 
export default Body;