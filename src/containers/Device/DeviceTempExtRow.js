
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify, remove } from '../../actions';
import RemoveButton from '../../components/RemoveButton';
import Slider from '../../components/Slider';



class Container extends Component {
  change = (event) => {
    const { value } = event.target;
    this.props.change({ code: value });
  }
  render() {
    const { id, temperature, temperature_correct = 0, index, code, onRemove, change } = this.props;
    const { temperature_raw = temperature } = this.props;
    return (
      <tr>
        <td className="paper">
          <Typography use="body">{index}</Typography>
        </td>
        <td width="60%" className="paper">
          <TextField label={id} value={code || ''} onChange={this.change} style={{ width: '100%' }} />
        </td>
        <td >
          <Typography use="body">{`${temperature_raw && (temperature_raw + temperature_correct).toFixed(2)}°C`}</Typography>
        </td>
        <td className="paper" width="30%" >
          <Slider
            label={`${temperature_raw && (temperature_raw).toFixed(2)} °C, cor`}
            value={temperature_correct}
            min={-10}
            max={10}
            step={0.1}
            onInput={(event) => {
              change({ temperature_correct: event.detail.value });
            }} />
        </td>
        <td>
          <RemoveButton title={code || id} icon="remove" onClick={onRemove} />
        </td>
      </tr>
    );
  }
}


export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, master }) => bindActionCreators({
    change: (payload) => modify(id, payload),
    onRemove: () => remove(master, 'temperature_ext', id),
  }, dispatch)
)(Container);
