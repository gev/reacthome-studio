
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Slider } from '@rmwc/slider';
import { modify } from '../../../../actions';

class Container extends Component {
  input = (event) => {
    this.props.modify(event.detail.value);
  }

  render() {
    const { min } = this.props;
    return (
      <Slider
        min={15}
        max={60}
        step={1}
        value={min}
        onInput={this.input}
        discrete
      />
    );
  }
}

export default connect(
  (state, { payload }) => payload,
  (dispatch, { action, payload }) => bindActionCreators({
    modify: (min) => modify(action, { payload: { ...payload, min } }),
  }, dispatch)
)(Container);
