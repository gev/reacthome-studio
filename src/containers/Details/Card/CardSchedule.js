
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
import { TITLE, CODE, SCHEDULE } from '../../../constants';
import SelectScript from '../SelectScript';

type Props = {
  code: ?string,
  title: ?string,
  time: ?number,
  state: ?boolean,
  change: (payload: {}) => void,
  removeField: () => void,
  details: () => void
};

class Container extends Component<Props> {
  state = { time: 0 };

  componentWillMount() {
    this.start(this.props.time);
  }

  componentWillReceiveProps({ time }) {
    this.start(time);
  }

  start = (time) => {
    this.setState({ time: Math.round(time / 1000) });
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.state.time === 0) clearInterval(this.timer);
      this.setState({ time: this.state.time - 1 });
    }, 1000);
  }

  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  render() {
    const {
      code, title, schedule, removeField, details, state
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
          <Typography use="headline4">{schedule}</Typography>
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
