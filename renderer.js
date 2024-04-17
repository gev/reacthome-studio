
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';

ReactDOM.render(<App />, document.getElementById('app'));

setInterval(() => {
    Array.prototype.filter.call(document.getElementsByClassName('blink'), (element => {
        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = null
    }));
}, 1000);
