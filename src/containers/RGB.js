import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { request } from '../actions';
import Slider from '../components/Slider';
import { ACTION_RGB_DIM } from '../constants';

class Container extends Component {

  red = (event) => {
    const { g, b } = this.props;
    this.props.set({ g, b, r: event.detail.value });
  };

  green = (event) => {
    const { r, b } = this.props;
    this.props.set({ r, b, g: event.detail.value });
  };

  blue = (event) => {
    const { r, g } = this.props;
    this.props.set({ r, g, b: event.detail.value });
  };

  render() {
    const { r = 0, g = 0, b = 0, index, label } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td><div className="paper">{label || index || ''}</div></td>
            <td><div className="paper"><Slider label="r" value={r} min={0} max={255} step={1} onInput={this.red} discrete color="red" /></div></td>
            <td><div className="paper"><Slider label="g" value={g} min={0} max={255} step={1} onInput={this.green} discrete color="green" /></div></td>
            <td><div className="paper"><Slider label="b" value={b} min={0} max={255} step={1} onInput={this.blue} discrete color="blue" /></div></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(
  ({ pool }, { id, index }) => pool[`${id}/rgb/${index}`] || {},
  (dispatch, { daemon, id, index }) => bindActionCreators({
    set: (value) => request(daemon, {
      type: ACTION_RGB_DIM, value, id, index
    })
  }, dispatch)
)(Container);
