
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Typography } from '@rmwc/typography';
import { modify } from '../../../actions';
import SelectScript from '../SelectScript';

class Container extends Component {
  select = (id) => {
    this.props.modify({ onIR: id });
  };
  remove = () => {
    this.props.modify({ onIR: null });
  };
  render() {
    const { onIR, project } = this.props;
    return (
      <tr>
        <td className="paper">
          <div>
            <SelectScript id={onIR} project={project} onSelect={this.select} />
          </div>
        </td>
        <td>
          {
            onIR && <Typography use="caption" onClick={this.remove}><strong> X </strong></Typography>
          }
        </td>
      </tr>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    modify: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
