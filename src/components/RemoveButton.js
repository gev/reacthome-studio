import { IconButton } from '@rmwc/icon-button';
import { remote } from 'electron';
import React, { Component } from 'react';

export default class extends Component {
    remove = () => {
        if (remote.dialog.showMessageBoxSync(null, {
            type: 'question',
            buttons: ['Remove', 'Cancel'],
            defaultId: 0,
            cancelId: 1,
            detail: this.props.title,
            message: 'Remove the item?'
        }) === 0) {
            this.props.onClick();
        }
    }
    render() {
        return (
            <IconButton icon="remove" onClick={this.remove} />
        )
    }
}
