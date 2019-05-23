
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons,
  CardActionButtons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { TITLE, CODE } from '../../../constants';
import { remove, modify } from '../../../actions';
import Di from '../../Device/DeviceDiChannel';
import Do from '../../Device/DeviceDoChannel';

type Props = {
  id: string;
  daemon: String;
  title: ?String;
  code: ?String;
  host: ?string;
  port: ?number;
  change: (payload: {}) => void,
  removeField: () => void,
  details: () => void
};

type RowDiProps = {
  id: string;
  index: number;
};

type RowDoProps = {
  id: string;
  daemon: string;
  index: number;
};

const RowDi = ({ id, index } : RowDiProps) => (
  <tr>
    <td className="paper"><Di id={id} index={index + 0} /></td>
    <td className="paper"><Di id={id} index={index + 1} /></td>
    <td className="paper"><Di id={id} index={index + 2} /></td>
    <td className="paper"><Di id={id} index={index + 3} /></td>
    <td className="paper"><Di id={id} index={index + 4} /></td>
    <td className="paper"><Di id={id} index={index + 5} /></td>
  </tr>
);

const RowDo = ({ id, daemon, index } : RowDoProps) => (
  <tr>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 0} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 1} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 2} /></td>
    <td className="paper"><Do id={id} daemon={daemon} index={index + 3} /></td>
  </tr>
);

class Container extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  changeInt = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: parseInt(value, 10) });
  }

  render() {
    const {
      id, daemon,
      title, code, host, port = 502,
      details, removeField
    } = this.props;
    // const rows = [];
    // for (let i = 0; i < Math.min(512, size); i += 1) {
    //   rows.push(<Row {...this.props} key={`${id}/${ARTNET}${i}`} index={i + 1} />);
    // }
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <TextField id="host" value={host} label="host" type="text" onChange={this.change} />
          <TextField id="port" value={port} label="port" type="number" onChange={this.changeInt} />
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowDo id={id} daemon={daemon} index={1} />
              <RowDo id={id} daemon={daemon} index={5} />
            </tbody>
          </table>
        </div>
        <div className="paper">
          <table>
            <tbody>
              <RowDi id={id} daemon={daemon} index={1} />
              <RowDi id={id} daemon={daemon} index={7} />
              <RowDi id={id} daemon={daemon} index={13} />
              <RowDi id={id} daemon={daemon} index={19} />
              <RowDi id={id} daemon={daemon} index={25} />
              <RowDi id={id} daemon={daemon} index={31} />
              <RowDi id={id} daemon={daemon} index={37} />
              <RowDi id={id} daemon={daemon} index={43} />
              <RowDi id={id} daemon={daemon} index={49} />
              <RowDi id={id} daemon={daemon} index={55} />
              <RowDi id={id} daemon={daemon} index={61} />
              <RowDi id={id} daemon={daemon} index={67} />
              <RowDi id={id} daemon={daemon} index={73} />
              <RowDi id={id} daemon={daemon} index={79} />
              <RowDi id={id} daemon={daemon} index={85} />
            </tbody>
          </table>
        </div>
        <CardActions>
          <CardActionButtons>
            <CardAction onClick={details}>Details</CardAction>
          </CardActionButtons>
          <CardActionIcons>
            <CardAction icon="remove" onClick={removeField} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, {
    project, parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
