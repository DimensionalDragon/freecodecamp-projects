import React, { Component } from 'react';
import cutZeros from '../cutZeros';

const buttons = [
    {type: null, id: 'clear', value: 'AC'},
    {type: null, id: 'del', value: '←'},
    {type: 'operator', id: 'divide', value: '÷'},
    {type: 'number', id: 'seven', value: '7'},
    {type: 'number', id: 'eight', value: '8'},
    {type: 'number', id: 'nine', value: '9'},
    {type: 'operator', id: 'multiply', value: 'x'},
    {type: 'number', id: 'four', value: '4'},
    {type: 'number', id: 'five', value: '5'},
    {type: 'number', id: 'six', value: '6'},
    {type: 'operator', id: 'subtract', value: '-'},
    {type: 'number', id: 'one', value: '1'},
    {type: 'number', id: 'two', value: '2'},
    {type: 'number', id: 'three', value: '3'},
    {type: 'operator', id: 'add', value: '+'},
    {type: 'number', id: 'zero', value: '0'},
    {type: null, id: 'decimal', value: '.'},
    {type: null, id: 'equals', value: '='},
]

class Calculator extends Component {
    state = {
        calculation: '', // Calculation (small) Screen
        result: '0', // Result (main) Screem
        reset: false, // If true, next number button pressed will reset result screen
        operatorSelect: false, // If true, next operator button pressed will change selected operator instead of calculating
        negativeNumber: false // If true, the user has pressed a negative number instead of subtraction operator
    }
    append = num => {
        const {result, reset} = this.state;
        let newResult = result;
        if(newResult === 'Error' || reset) newResult = '0';
        if(newResult.length >= 10) return; // Max 10 digit
        if(num === '.' && this.state.result.includes('.')) return;
        if(newResult === '0') newResult = num === '.' ? '0' : '';
        this.setState({result: newResult + num, reset: false, operatorSelect: false});
    }
    operation = operator => {
        if(this.state.operatorSelect) {
            if(this.state.negativeNumber) this.setState(prevState => ({result: '0', calculation: prevState.calculation.split(' ')[0] + ' ' + operator, negativeNumber: false}));
            else if(operator === '-') this.setState({result: '-', negativeNumber: true});
            else this.setState(prevState => ({calculation: prevState.calculation.split(' ')[0] + ' ' + operator}));
            return;
        }
        if(this.state.calculation !== '') this.calculate();
        this.setState(prevState => ({
            calculation: prevState.result === 'Error' ? '' : prevState.result + ' ' + operator,
            result: prevState.result === 'Error' ? 'Error' : '0',
            operatorSelect: true
        }));
    }
    calculate() {
        const {calculation, result} = this.state;
        const leftOperand = parseFloat(calculation.split(' ')[0]);
        const operator = calculation.split(' ')[1];
        const rightOperand = parseFloat(result);
        let calculationResult;
        switch(operator) {
            case '+':
                calculationResult = leftOperand + rightOperand;
                break;
            case '-':
                calculationResult = leftOperand - rightOperand;
                break;
            case '*':
            case 'x':
                calculationResult = leftOperand * rightOperand;
                break;
            case '/':
            case '÷':
                if(rightOperand === 0) {
                    this.setState({result: 'Error', calculation: ''});
                    return;
                }
                calculationResult = leftOperand / rightOperand;
                break;
            default:
                return;
        }
        this.setState({
            calculation: '',
            result: cutZeros(calculationResult.toPrecision(15)).toString().slice(0, 11),
            reset: true
        })
    }
    clear() {
        this.setState({result: '0', calculation: ''});
    }
    delete() {
        const {result, reset} = this.state;
        let newResult;
        if(result.length === 1 || result === 'Error' || reset) newResult = '0';
        else newResult = result.slice(0, -1);
        this.setState({result: newResult, reset: false});
    }
    handleButtonClick = (type, id, content) => {
        if(id === 'del') this.delete();
        if(id === 'equals') this.calculate();
        if(id === 'clear') this.clear();
        if(id === 'decimal') this.append('.');
        switch(type) {
            case 'number':
                this.append(content);
                break;
            case 'operator':
                this.operation(content);
                break;
            default:
                break;
        }
    }
    componentDidMount = () => {
        document.addEventListener('keydown', event => {
        if(event.key.match(/^[0-9.]$/)) this.append(event.key);
        else if(event.key.match(/^[+-/x*]$/)) this.operation(event.key);
        else if(event.key === 'Backspace') this.delete();
        else if(event.key === 'Delete') this.clear();
        else if(event.key === '=' || event.key === 'Enter') this.calculate();
        });
    }
    render() {
        return (
            <div className='d-flex flex-column justify-content-between'  id='calculator'>
                <div className='screen-container'>
                    <div className='calculation'>{this.state.calculation}</div>
                    <div className='result' id='display'>{this.state.result}</div>
                </div>
                <div className='buttons-container'>
                    {buttons.map((button, index) => {
                        return <div
                            className={button.type ? `button ${button.type}` : 'button'} id={button.id} key={index + 1}
                            onClick={() => this.handleButtonClick(button.type, button.id, button.value)}>
                            {button.value}
                        </div>
                    })}
                </div>
            </div>
        );
    }
}
 
export default Calculator;