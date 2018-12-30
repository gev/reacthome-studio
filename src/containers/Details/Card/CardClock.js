
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
import { TITLE, CODE } from '../../../constants';

type Props = {
  code: ?string,
  title: ?string,
  timestamp: ?number,
  state: ?boolean,
  change: (payload: {}) => void,
  removeField: () => void,
  details: () => void
};

class Container extends Component<Props> {
  state = { time: 0 };

  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({ time: Math.round((Date.now() - this.props.timestamp) / 1000) });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  render() {
    const {
      code, title, removeField, details, state
    } = this.props;
    const { time } = this.state;
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        {
          state && (
            <div className="paper">
              <Typography use="headline3">{time}</Typography>
            </div>
          )
        }
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
