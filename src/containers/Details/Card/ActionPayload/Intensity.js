
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'rmwc';
import { modify } from '../../../../actions';
import Slider from '../../../../components/Slider';
import SelectMenu from '../../SelectMenu';

class Container extends Component {
  state = { type: 'cool' }

  componentDidMount() {
    const { cool, heat, ventilation } = this.props;
    if (cool !== undefined) {
      this.setState({ type: 'cool' });
    } else if (heat !== undefined) {
      this.setState({ type: 'heat' });
    } else if (ventilation !== undefined) {
      this.setState({ type: 'ventilation' });
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
    const { cool, heat, ventilation } = this.props;
    let v;
    switch (this.state.type) {
      case 'cool':
        v = cool;
        break;
      case 'heat':
        v = heat;
        break;
      case 'ventilation':
        v = ventilation;
        break;
    }
    return (
      <div>
        <SelectMenu
          handle={<Button>{this.state.type}</Button>}
          onSelect={this.onSelect}
          options={['cool', 'heat', 'ventilation']}
        />
        <Slider
          label="intensity"
          min={0}
          max={9}
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
