

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
import { remove, modify, request } from '../../../actions';
import { CODE, ACTION_TYPE, DELAY } from '../../../constants';
import SelectMenu from '../SelectMenu';
import ActionPayload from './ActionPayload';

type Props = {
  id: string,
  site: string,
  project: string,
  code: ?string,
  type: ?string,
  delay: ?Number,
  daemon: ?string,
  payload: ?{},
  change: (payload: {}) => void,
  removeField: () => void,
  run: () => void
};

class Container extends Component<Props> {
  change = ({ target: { id, value, type } }) => {
    this.props.change({ [id]: type === 'number' ? Number(value) : value });
  }

  setType = (type) => {
    this.props.change({ ...this.props.payload, type });
  }

  run = () => {
    const {
      daemon, type, payload, run
    } = this.props;
    if (daemon) run(daemon, { ...payload, type });
  }

  render() {
    const {
      id, code, delay, type, site, project, removeField, daemon, change
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
        <ActionPayload id={id} site={site} project={project} root={project} daemon={daemon} change={change} />
        <CardActions>
          <TextField id={DELAY} value={delay || ''} onChange={this.change} label={DELAY} type="number" />
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
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    change: (value) => modify(id, value),
    run: (daemon, action) => request(daemon, action)
  }, dispatch)
)(Container);
