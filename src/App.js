import React, { Component } from 'react';
import { withStyles } from "material-ui";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Reacthome</h1>
      </div>
    );
  }
}

export default App;
