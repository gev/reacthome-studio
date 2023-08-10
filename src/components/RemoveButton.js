import React, { Component } from 'react';
import { IconButton } from '@rmwc/icon-button';

export default class extends Component {
    remove = () => {
        if (confirm(`Remove "${this.props.title}?"`)) {
            this.props.onClick();
        }
    }
    render() {
        return (
            <IconButton icon="remove" onClick={this.remove} />
        )
    }
}
