/* eslint-disable no-bitwise */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Slider } from '@rmwc/slider';
import { modify } from '../../../../actions';

type Props = {
  value: ?{},
  set: (id: string) => void;
};

class Container extends Component<Props> {
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
        <Slider value={r} min={0} max={255} step={1} onInput={this.red} />
        <Slider value={g} min={0} max={255} step={1} onInput={this.green} />
        <Slider value={b} min={0} max={255} step={1} onInput={this.blue} />
      </div>
    );
  }
}

export default connect(
  (state, { payload }) => payload,
  (dispatch, { action, payload }) => bindActionCreators({
    set: (value) => modify(action, { payload: { ...payload, value } }),
  }, dispatch)
)(Container);
