
import { TextField } from '@rmwc/textfield';
import React, { Component } from 'react';
import { MESSAGE, TITLE } from '../../../../constants';


export default class extends Component {
  change = ({ target: { id, value } }) => {
    const { payload } = this.props;
    this.props.change({ payload: { ...payload, [id]: value } });
  }

  render() {
    const { payload = {} } = this.props;
    return (
      <div className="paper">
        <TextField id={TITLE} value={payload.title || ''} onChange={this.change} label={TITLE} style={{ width: '100%' }} />
        <TextField id={MESSAGE} value={payload.message || ''} onChange={this.change} label={MESSAGE} style={{ width: '100%' }} />
      </div>
    );
  }
}
