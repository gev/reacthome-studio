
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { modify } from '../../../actions';
import { onStart } from '../../../constants';
import SelectScript from '../SelectScript';

type Props = {
  id: string,
  onStart: ?string;
  change: (payload: {}) => void,
};

class Container extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  select = (script) => {
    this.props.change({ onStart: script });
  }

  remove = () => {
    this.props.change({ onStart: null });
  }

  render() {
    const { id } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <Typography use="caption">{onStart}</Typography>
            </td>
            <td>
              <SelectScript id={this.props.onStart} project={id} onSelect={this.select} />
            </td>
            <td>
              {
                this.props.onStart &&
                  <Typography use="caption" onClick={this.remove}><strong> X </strong></Typography>
              }
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload),
  }, dispatch)
)(Container);
