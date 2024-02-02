
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify, remove } from '../../actions';
import RemoveButton from '../../components/RemoveButton';



class Container extends Component {
  change = (event) => {
    const { value } = event.target;
    this.props.change({ code: value });
  }
  render() {
    const { id, temperature, index, code, onRemove } = this.props;
    return (
      <tr>
        <td className="paper">
          <Typography use="body">{index}</Typography>
        </td>
        <td className="paper">
          <Typography use="caption">{id}</Typography>
        </td>
        <td className="paper">
          <TextField value={code || ''} onChange={this.change} placeholder="Code" />
        </td>
        <td className="paper">
          <Typography use="body">{`${temperature && temperature.toFixed(2)} °C`}</Typography>
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
