import { IconButton } from '@rmwc/icon-button';
import React, { Component } from 'react';

export default class extends Component {
    remove = () => {
        if (window.confirm(`Remove the "${this.props.title}?"`)) {
            this.props.onClick();
        }
    }
    render() {
        return (
            <IconButton icon="remove" onClick={this.remove} />
        )
    }
}
