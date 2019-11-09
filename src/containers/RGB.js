
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Slider } from '@rmwc/slider';
import { request } from '../actions';
import { ACTION_RGB_DIM } from '../constants';

type Props = {
  set: (value: {}) => void
}

class Container extends Component<Props> {
  state = {};

  red = (event) => {
    this.props.set({ ...this.state, r: event.detail.value });
    this.setState({ ...this.state, r: event.detail.value });
  };

  green = (event) => {
    this.props.set({ ...this.state, g: event.detail.value });
    this.setState({ ...this.state, g: event.detail.value });
  };

  blue = (event) => {
    this.props.set({ ...this.state, b: event.detail.value });
    this.setState({ ...this.state, b: event.detail.value });
  };

  render() {
    const { r = 0, g = 0, b = 0 } = this.state;
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
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { daemon, id }) => bindActionCreators({
    set: (value) => request(daemon, { type: ACTION_RGB_DIM, value, id })
  }, dispatch)
)(Container);
