
import React, { Component } from 'react';
import Autocomplete from '../../../Filter';

export default class extends Component {
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
