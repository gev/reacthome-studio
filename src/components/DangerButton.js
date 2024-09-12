import { dialog } from '@electron/remote';
import React, { Component } from 'react';
import { Button } from 'rmwc';

export default class extends Component {
    remove = () => {
        const { label, detail, onClick, message } = this.props;
        if (dialog.showMessageBoxSync(null, {
            type: 'question',
            buttons: [label, 'Cancel'],
            defaultId: 0,
            cancelId: 1,
            message: message,
            detail: detail,
        }) === 0) {
            onClick();
        }
    }
    render() {
        return (
            <Button onClick={this.remove}>{this.props.label}</Button>
        )
    }
}
