
import React, { Component } from 'react';
import { TextField } from '@rmwc/textfield';
import { TITLE, MESSAGE } from '../../../../constants';

type Props = {
  payload: ?{};
  change: (id: string) => void;
};

export default class extends Component<Props> {
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
