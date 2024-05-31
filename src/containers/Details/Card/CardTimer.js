
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


class Container extends Component {
  state = { time: 0 };

  componentWillMount() {
    this.start(this.props.time);
  }

  componentWillReceiveProps({ time }) {
    this.start(time);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
