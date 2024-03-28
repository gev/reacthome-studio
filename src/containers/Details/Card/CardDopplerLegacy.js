
import {
  Card,
  CardAction,
  CardActionButtons,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { modify, remove } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import { CODE, TITLE } from '../../../constants';
import DeviceDopplerLegacy from '../../Device/DeviceDopplerLegacy';
import SelectScript from '../SelectScript';

class Container extends Component {
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
        <DeviceDopplerLegacy id={id} daemon={daemon} />
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
            <CardActionRemove remove={removeField} />
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
