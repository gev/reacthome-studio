
import React, { Component } from 'react';
import Autocomplete from '../../../Filter';

export default class extends Component {
  select = (id) => {
    const { change, payload } = this.props;
    change({ payload: { ...payload, id } });
  }

  render() {
    const { id, root, payload = {} } = this.props;
    return (
      <div>
        <div className="paper">
          <Autocomplete id={payload.id} root={root} onSelect={this.select} />
        </div>
      </div>
    );
  }
}
