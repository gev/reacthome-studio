
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { remove, modify, makeBind } from '../../../actions';
import { CODE, TITLE } from '../../../constants';
import DeviceRS485Channel from '../../Device/DeviceRS485Channel';
import SelectRS485 from './SelectRS485';
import CardActionRemove from '../../../components/CardActionRemove';

class Container extends Component {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  select = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }
  render() {
    const {
      code, project, daemon, bind, title, removeField
    } = this.props;
    const [id, , index] = bind ? bind.split('/') : [];
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <SelectRS485 id={bind} root={project} onSelect={this.select} />
        </div>
        {
          bind && (
            <DeviceRS485Channel id={id} index={index} daemon={daemon} />
          )
        }
        <CardActions>
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
    change: (payload) => modify(id, payload),
    makeBind
  }, dispatch)
)(Container);
