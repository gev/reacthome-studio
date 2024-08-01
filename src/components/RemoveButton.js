import { IconButton } from '@rmwc/icon-button';
import { dialog } from '@electron/remote';
import React, { Component } from 'react';

export default class extends Component {
    remove = () => {
        if (dialog.showMessageBoxSync(null, {
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
