
import { Button } from '@rmwc/button';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import { DEVICE_TYPE_DOPPLER_1_DI_4, DEVICE_TYPE_DOPPLER_5_DI_4, DOPPLER } from '../../../../constants';
import SelectMenu from '../../SelectMenu';

class Container extends Component {
  select = (id) => {
    if (this.props.payload.id !== id) {
      this.props.select(id);
    }
  }

  componentDidUpdate(props) {
    const { type, modify } = this.props;
    let n = 0;
    switch (type) {
      case DEVICE_TYPE_DOPPLER_1_DI_4:
        n = 1;
        break;
      case DEVICE_TYPE_DOPPLER_5_DI_4:
        n = 5;
        break;
    }
    if (n !== props.payload.n) {
      modify(n)
    }
  }

  render() {
    const { title, code, root } = this.props;
    return (
      <SelectMenu
        handle={<Button>{code || title || DOPPLER}</Button>}
        onSelect={this.select}
        select={[DOPPLER]}
        root={root}
      />
    );
  }
}

export default connect(
  ({ pool }, { payload: { id } = {} }) => pool[id] || {},
  (dispatch, { action, payload }) => bindActionCreators({
    select: (id) => modify(action, { payload: { ...payload, id, index: 0 } }),
    modify: (n) => modify(action, { payload: { ...payload, n } }),
  }, dispatch)
)(Container);
