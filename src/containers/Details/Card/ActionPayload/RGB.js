
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Slider } from '@rmwc/slider';
import { modify } from '../../../../actions';

type Props = {
  value: ?number,
  set: (id: string) => void;
};

class Container extends Component<Props> {
  red = (event) => {
    const { value = 0x7f7f7f, set } = this.props;
    set(((event.detail.value & 0xff) << 16) | (value & 0x00ffff));
  };

  green = (event) => {
    const { value = 0x7f7f7f, set } = this.props;
    set(((event.detail.value & 0xff) << 8) | (value & 0xff00ff));
  };

  blue = (event) => {
    const { value = 0x7f7f7f, set } = this.props;
    set((event.detail.value & 0xff) | (value & 0xffff00));
  };

  render() {
    const { value = 0x7f7f7f } = this.props;
    return (
      <div className="paper">
        <Slider value={(value >> 16) & 0xff} min={0} max={255} step={1} onInput={this.red} />
        <Slider value={(value >> 8) & 0xff} min={0} max={255} step={1} onInput={this.green} />
        <Slider value={value & 0xff} min={0} max={255} step={1} onInput={this.blue} />
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
