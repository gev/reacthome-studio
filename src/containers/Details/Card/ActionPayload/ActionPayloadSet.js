
import React, { Component } from 'react';
import { TextField } from '@rmwc/textfield';
import { TITLE } from '../../../../constants';
import Autocomplete from '../../../Filter';

type Props = {
  root: ?string;
  payload: ?{};
  change: (id: string) => void;
};

export default class extends Component<Props> {
  change = ({ target: { id, value } }) => {
    const { payload } = this.props;
    this.props.change({ payload: { ...payload, payload: { [id]: value } } });
  }

  select = (id) => {
    const { payload } = this.props;
    this.props.change({ payload: { ...payload, id } });
  }

  render() {
    const { root, payload: { id, payload: { title } = {} } = {} } = this.props;
    return [
      <div key="id" className="paper">
        <Autocomplete id={id} root={root} onSelect={this.select} />
      </div>,
      <div key="title" className="paper">
        <TextField id={TITLE} value={title || ''} onChange={this.change} label={TITLE} style={{ width: '100%' }} />
      </div>
    ];
  }
}
