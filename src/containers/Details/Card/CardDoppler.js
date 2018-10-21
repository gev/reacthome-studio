
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
import { remove, set } from '../../../actions';
import { TITLE, CODE } from '../../../constants';
import DeviceDoppler from '../../Device/DeviceDoppler';
import SelectScript from '../SelectScript';

type Props = {
  id: string,
  code: ?string,
  title: ?string,
  project: string,
  daemon: string,
  onDoppler: ?string;
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

  select = (onDoppler) => {
    this.props.change({ onDoppler });
  }

  remove = () => {
    this.props.change({ onDoppler: null });
  }

  render() {
    const {
      id, code, title, removeField, details, daemon, project, onDoppler
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <DeviceDoppler id={id} daemon={daemon} />
        <div className="paper">
          <table>
            <tbody>
              <tr>
                <td>
                  <SelectScript id={onDoppler} project={project} onSelect={this.select} />
                </td>
                <td>
                  {
                    this.props.onDoppler &&
                      <Typography use="caption" onClick={this.remove}><strong> X </strong></Typography>
                  }
                </td>
              </tr>
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
    removeField: () => (multiple ? remove(parent, field, id) : set(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => set(id, payload)
  }, dispatch)
)(Container);
