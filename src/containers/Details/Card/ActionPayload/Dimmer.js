
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Slider } from '@rmwc/slider';
import { modify } from '../../../../actions';

type Props = {
  value: ?number,
  modify: (id: string) => void;
};

class Container extends Component<Props> {
  input = (event) => {
    this.props.modify(event.detail.value);
  }

  render() {
    const { value } = this.props;
    return (
      <Slider
        min={0}
        max={255}
        step={1}
        value={value}
        onInput={this.input}
        discrete
      />
    );
  }
}

export default connect(
  (state, { payload }) => payload,
  (dispatch, { action, payload }) => bindActionCreators({
    modify: (value) => modify(action, { payload: { ...payload, value } }),
  }, dispatch)
)(Container);
