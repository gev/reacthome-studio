
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../../actions';
import Slider from '../../../../components/Slider';


class Container extends Component {
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
