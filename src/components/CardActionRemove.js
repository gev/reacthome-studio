import { CardAction } from '@rmwc/card';
import { remote } from 'electron';
import React, { Component } from 'react';

export default class extends Component {
    remove = () => {
        if (remote.dialog.showMessageBoxSync(null, {
            type: 'question',
            buttons: ['Remove', 'Cancel'],
            defaultId: 0,
            cancelId: 1,
            detail: '',
            message: 'Remove an item?'
        }) === 0) {
            this.props.remove();
        }
    }
    render() {
        return (
            <CardAction icon="remove" onClick={this.remove} />
        )
    }
}
