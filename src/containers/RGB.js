
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Slider } from '@rmwc/slider';
import { request } from '../actions';
import { ACTION_RGB_SET } from '../constants';

type Props = {
  rgb: ?number,
  set: (value: number) => void
}

class Container extends Component<Props> {
  red = (event) => {
    const { rgb = 0x7f7f7f, set } = this.props;
    set(((event.detail.value & 0xff) << 16) | (rgb & 0x00ffff));
  };

  green = (event) => {
    const { rgb = 0x7f7f7f, set } = this.props;
    set(((event.detail.value & 0xff) << 8) | (rgb & 0xff00ff));
  };

  blue = (event) => {
    const { rgb = 0x7f7f7f, set } = this.props;
    set((event.detail.value & 0xff) | (rgb & 0xffff00));
  };

  render() {
    const { rgb = 0x7f7f7f } = this.props;
    return (
      <div className="paper">
        <Slider value={(rgb >> 16) & 0xff} min={0} max={255} step={1} onInput={this.red} />
        <Slider value={(rgb >> 8) & 0xff} min={0} max={255} step={1} onInput={this.green} />
        <Slider value={rgb & 0xff} min={0} max={255} step={1} onInput={this.blue} />
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { daemon, id }) => bindActionCreators({
    set: (value) => request(daemon, { type: ACTION_RGB_SET, value, id })
  }, dispatch)
)(Container);
