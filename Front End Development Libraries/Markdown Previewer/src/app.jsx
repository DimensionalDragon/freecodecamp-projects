import React, { Component } from 'react';

import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() { 
        return (
            <React.Fragment>
                <Header />
                <Body />
                <Footer />
            </React.Fragment>
        );
    }
}
 
export default App;