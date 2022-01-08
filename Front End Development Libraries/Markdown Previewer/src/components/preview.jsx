import React, { Component } from 'react';
import { marked } from 'marked'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

class Preview extends Component {
    updateHighlight = () => {
        document.getElementById('preview').innerHTML = marked.parse(this.props.output);
        document.querySelectorAll('pre code').forEach(element => {
            hljs.highlightBlock(element);
        });
    }
    
    componentDidMount() {
        marked.setOptions({gfm: true, breaks: true})
        this.updateHighlight();
    }
    
    componentDidUpdate() {
        this.updateHighlight();
    }

    render() { 
        return (
            <div className='w-50 p-2 overflow-auto' id='preview'></div>
        );
    }
}
 
export default Preview;