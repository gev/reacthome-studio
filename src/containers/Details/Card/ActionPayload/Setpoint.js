
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'rmwc';
import { modify } from '../../../../actions';
import Slider from '../../../../components/Slider';
import SelectMenu from '../../SelectMenu';

class Container extends Component {
  state = { type: 'temperature' }

  componentDidMount() {
    const { value, temperature, humidity, co2 } = this.props;
    if (value !== undefined || temperature !== undefined) {
      this.setState({ type: 'temperature' });
    } else if (humidity !== undefined) {
      this.setState({ type: 'humidity' });
    } else if (co2 !== undefined) {
      this.setState({ type: 'co2' });
    }
  }

  input = (event) => {
    this.props.modify(this.state.type, event.detail.value);
  }

  onSelect = (type) => {
    this.setState({ type });
    this.props.modify(this.state.type, null);
  }

  render() {
    const { value, temperature, humidity, co2 } = this.props;
    let min, max, v;
    switch (this.state.type) {
      case 'temperature':
        min = 5;
        max = 40;
        v = temperature || value;
        break;
      case 'humidity':
        min = 0;
        max = 100;
        v = humidity;
        break;
      case 'co2':
        min = 200;
        max = 1800;
        v = co2;
        break;
    }
    return (
      <div>
        <SelectMenu
          handle={<Button>{this.state.type}</Button>}
          onSelect={this.onSelect}
          options={['temperature', 'humidity', 'co2']}
        />
        <Slider
          label="setpoint"
          min={min}
          max={max}
          step={1}
          value={v}
          onInput={this.input}
          discrete
        />
      </div>
    );
  }
}

export default connect(
  (state, { payload }) => payload,
  (dispatch, { action, payload }) => bindActionCreators({
    modify: (type, value) => modify(action, { payload: { id: payload.id, [type]: value } }),
  }, dispatch)
)(Container);
