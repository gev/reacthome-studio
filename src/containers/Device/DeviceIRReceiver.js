
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@rmwc/textfield';

type PropsType = {
  value: ?[];
};

class Container extends Component<PropsType> {
  render() {
    const { value = [] } = this.props;
    return (
      <div className="paper">
        <TextField
          value={value.toString()}
          label="Command"
          rows={(value.length / 16) + 1}
          fullwidth
          textarea
          dense
        />
      </div>
    );
  }
}

export default connect(({ pool }, { id }) => pool[id] || {})(Container);
