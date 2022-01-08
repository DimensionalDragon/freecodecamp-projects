import React, { Component } from 'react';

class Editor extends Component {
    render() {
        return (
            <div className='w-50 mt-0 editor-container'>
                <textarea className='w-100 h-100' id='editor' value={this.props.input} onChange={this.props.handleChange}></textarea>
            </div>
        );
    }
}
 
export default Editor;