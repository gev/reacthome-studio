

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';
import { remove, set, request } from '../../../actions';
import { CODE, ACTION_TYPE } from '../../../constants';
import SelectMenu from '../SelectMenu';
import ActionPayload from './ActionPayload';

type Props = {
  id: string,
  site: string,
  project: string,
  code: ?string,
  type: ?string,
  daemon: ?string,
  payload: ?{},
  change: (payload: {}) => void,
  removeField: () => void,
  run: () => void
};

class Container extends Component<Props> {
  change = ({ target: { id, value } }) => {
    this.props.change({ [id]: value });
  }

  setType = (type) => {
    this.props.change({ type, payload: {} });
  }

  run = () => {
    const {
      daemon, type, payload, run
    } = this.props;
    if (daemon) run(daemon, { type, ...payload });
  }

  render() {
    const {
      id, code, type, site, project, removeField, daemon
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <SelectMenu
            handle={<Button>{type}</Button>}
            options={ACTION_TYPE}
            onSelect={this.setType}
          />
        </div>
        <ActionPayload id={id} site={site} project={project} daemon={daemon} />
        <CardActions>
          <CardActionIcons>
            <CardAction icon="play_arrow" onClick={this.run} />
            <CardAction icon="remove" onClick={removeField} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id, project }) => ({ ...pool[id], daemon: pool[project].daemon }),
  (dispatch, {
    parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : set(parent, { [field]: null })),
    change: (value) => set(id, value),
    run: (daemon, action) => request(daemon, action)
  }, dispatch)
)(Container);
