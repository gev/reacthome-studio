import React, { Component } from 'react';
import logo from '../logo.svg';
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Reacthome</h1>
        <webview src="https://get.webgl.org/" />
      </div>
    );
  }
}

export default Main;
