import React, { Component } from 'react';

import Editor from './editor';
import Preview from './preview';
import defaultText from '../defaultText';

class Body extends Component {
    constructor() {
        super();
        this.state = {
            text: defaultText.join('\n')
        }
    }

    handleChange = (event) => {
        this.setState({text: event.target.value});
    }

    render() {
        return (
            <div>
                <Editor input={this.state.text} handleChange={this.handleChange} />
                <Preview output={this.state.text} />
            </div>
        );
    }
}
 
export default Body;