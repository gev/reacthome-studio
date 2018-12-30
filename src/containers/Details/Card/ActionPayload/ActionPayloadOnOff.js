
import React, { Component } from 'react';
import Autocomplete from '../../../Filter';

type Props = {
  root: string;
  payload: ?{};
  change: (id: string) => void;
};

export default class extends Component<Props> {
  select = (id) => {
    const { change, payload } = this.props;
    change({ payload: { ...payload, id } });
  }

  render() {
    const { root, payload = {} } = this.props;
    return (
      <div className="paper">
        <Autocomplete id={payload.id} root={root} onSelect={this.select} />
      </div>
    );
  }
}
