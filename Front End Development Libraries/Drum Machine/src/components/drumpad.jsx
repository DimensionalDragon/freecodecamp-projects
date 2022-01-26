import React, { Component } from 'react';

const audioMap = {
    Q: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
    W: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
    E: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
    A: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
    S: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    D: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    Z: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    X: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    C: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
}

class Drumpad extends Component {
    componentDidMount() {
        document.addEventListener('keydown', event => {
            if(event.key.toUpperCase() === this.props.name) this.handlePlay();
        })
    }
    handlePlay = () => {
        const audio = document.querySelector(`#${this.props.name} audio`);
        audio.parentElement.classList.add('pressed');
        audio.currentTime = 0;
        audio.volume = this.props.volume;
        audio.play();
        setTimeout(() => audio.parentElement.classList.remove('pressed'), 100);
        this.props.handleDisplayChange(this.props.name);
    }
    render() {
        return (
            <div role='button' className='drum-pad' id={this.props.name} onClick={this.handlePlay}>
                <audio src={audioMap[this.props.name]} itemType='audio/mpeg' className='d-none clip' id={this.props.name}></audio>
                <p>{this.props.name}</p>
            </div>
        );
    }
}
 
export default Drumpad;