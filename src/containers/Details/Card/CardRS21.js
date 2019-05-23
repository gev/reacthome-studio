
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons,
  CardActionButtons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { remove, modify } from '../../../actions';
import { TITLE, CODE, IP } from '../../../constants';
import SelectScript from '../SelectScript';

type Props = {
  online: ?Boolean,
  project: ?string,
  code: ?string,
  title: ?string,
  ip: ?string,
  temperature: ?number,
  onTemperature: ?string,
  change: (payload: {}) => void,
  removeField: () => void,
  details: () => void
};

class Container extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  select = (id) => {
    this.props.change({ onTemperature: id });
  }

  remove = () => {
    this.props.change({ onTemperature: null });
  }

  render() {
    const {
      online, code, title, details, ip, removeField, temperature, onTemperature, project
    } = this.props;
    return (
      <Card className={!online && 'offline'}>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <TextField id={IP} value={ip || ''} onChange={this.change} label={IP} />
        </div>
        <table style={{ textAlign: 'left' }}>
          <tbody>
            <tr>
              <td className="paper">
                <Typography use="body">{title}</Typography>
              </td>
              <td className="paper">
                <Typography use="body">{temperature}°C</Typography>
              </td>
              <td>
                {
                  onTemperature &&
                    <Typography use="caption" onClick={this.remove}><strong> X </strong></Typography>
                }
              </td>
              <td>
                <SelectScript id={onTemperature} project={project} onSelect={this.select} />
              </td>
            </tr>
          </tbody>
        </table>
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
