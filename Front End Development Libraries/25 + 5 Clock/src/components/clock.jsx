import React, { Component } from 'react';
import Setter from './setter';
import Screen from './screen';
import Control from './control';
import {playBeep, resetBeep} from '../playBeep';

class Clock extends Component {
    state = {
        minutes: 25,
        seconds: 0,
        session: 25,
        break: 5,
        isOnBreak: false,
        paused: true
    }
    startTimer = () => {
        this.timer = setInterval(() => {
            if (this.state.seconds === 0) {
                this.state.minutes === 0 ? this.handleSessionToggle() : this.setState(prevState => ({
                    minutes: prevState.minutes - 1,
                    seconds: 59
                }));
            } else {
                this.setState(prevState => ({
                    seconds: prevState.seconds - 1
                }));
            }
        }, 1000);
    }
    handleIncrement = name => {
        if(!this.state.paused) return;
        switch(name) {
            case 'Session':
                if(this.state.session >= 60) return;
                this.setState(prevState => ({session: prevState.session + 1, minutes: this.state.isOnBreak ? prevState.minutes : prevState.session + 1}));
                break;
            case 'Break':
                if(this.state.break >= 60) return;
                this.setState(prevState => ({break: prevState.break + 1, minutes: this.state.isOnBreak ? prevState.break + 1 : prevState.minutes}));
                break;
            default:
                return;
        }
    }
    handleDecrement = name => {
        if(!this.state.paused) return;
        switch(name) {
            case 'Session':
                if(this.state.session <= 1) return;
                this.setState(prevState => ({session: prevState.session - 1, minutes: this.state.isOnBreak ? prevState.minutes : prevState.session - 1}));
                break;
            case 'Break':
                if(this.state.break <= 1) return;
                this.setState(prevState => ({break: prevState.break - 1, minutes: this.state.isOnBreak ? prevState.break - 1 : prevState.minutes}));
                break;
            default:
                return;
        }
    }
    handleSessionToggle = () => {
        const newBreakState = !this.state.isOnBreak;
        playBeep();
        this.setState(prevState => ({
            isOnBreak: newBreakState,
            minutes: newBreakState ? prevState.break : prevState.session,
            seconds: 0
        }));
    }
    handlePlayToggle = () => {
        const newPauseState = !this.state.paused;
        if(newPauseState) {
            clearInterval(this.timer);
        } else {
            this.startTimer();
        }
        this.setState({paused: newPauseState});
    }
    handleReset = () => {
        clearInterval(this.timer);
        resetBeep();
        this.setState({
            minutes: 25,
            seconds: 0,
            session: 25,
            break: 5,
            isOnBreak: false,
            paused: true
        });
    }
    render() {
        return (
            <div className='d-flex flex-column' id='clock'>
                <div className='d-flex flex-row align-items-center justify-self-start setters-container'>
                    <Setter name='Break' value={this.state.break} onIncrement={this.handleIncrement} onDecrement={this.handleDecrement} />
                    <Setter name='Session' value={this.state.session} onIncrement={this.handleIncrement} onDecrement={this.handleDecrement} />
                </div>
                <Screen name={this.state.isOnBreak ? 'Break' : 'Session'} minutes={this.state.minutes} seconds={this.state.seconds} />
                <Control paused={this.state.paused} onToggle={this.handlePlayToggle} onReset={this.handleReset} />
            </div>
        );
    }
}
 
export default Clock;