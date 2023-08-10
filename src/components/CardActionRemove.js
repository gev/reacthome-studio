import React, { Component } from 'react';
import { CardAction } from '@rmwc/card';

export default class extends Component {
    remove = () => {
        if (confirm("Remove item?")) {
            this.props.remove();
        }
    }
    render() {
        return (
            <CardAction icon="remove" onClick={this.remove} />
        )
    }
}
