/* eslint-disable no-bitwise */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from '../../../../components/Slider';
import { modify } from '../../../../actions';

class Container extends Component {
  red = (event) => {
    const { value, set } = this.props;
    set({ ...value, r: event.detail.value });
  };

  green = (event) => {
    const { value, set } = this.props;
    set({ ...value, g: event.detail.value });
  };

  blue = (event) => {
    const { value, set } = this.props;
    set({ ...value, b: event.detail.value });
  };

  render() {
    const { value: { r = 0, g = 0, b = 0 } = {} } = this.props;
    return (
      <div className="paper">
        <Slider label="r" value={r} min={0} max={255} step={1} onInput={this.red} discrete />
        <Slider label="g" value={g} min={0} max={255} step={1} onInput={this.green} discrete />
        <Slider label="b" value={b} min={0} max={255} step={1} onInput={this.blue} discrete />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch, { action, payload }) => bindActionCreators({
    set: (value) => modify(action, { payload: { ...payload, value } }),
  }, dispatch)
)(Container);
