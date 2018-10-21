
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
import { remove, set, makeBind } from '../../../actions';
import { CODE, TITLE } from '../../../constants';
import DeviceDo from './DeviceDo';
import SelectDo from './SelectDo';
import Do from './CardDoBind';

type Props = {
  id: string;
  bind: ?string;
  code: ?string,
  title: ?string;
  project: string,
  daemon: string,
  change: (payload: {}) => void,
  removeField: () => void,
  makeBind: (id: string, bind: string) => void
};

class Container extends Component<Props> {
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
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <SelectDo id={bind} root={project} onSelect={this.select} />
        </div>
        {
          bind && [
            <table key="bind">
              <tbody>
                <Do id={bind} project={project} />
              </tbody>
            </table>,
            <DeviceDo id={bind} daemon={daemon} />
          ]
        }
        <CardActions>
          <CardActionIcons>
            <CardAction icon="remove" onClick={removeField} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id }) => ({ ...pool[id], get: (subj) => pool[subj] || {} }),
  (dispatch, {
    project, parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : set(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => set(id, payload),
    makeBind
  }, dispatch)
)(Container);
