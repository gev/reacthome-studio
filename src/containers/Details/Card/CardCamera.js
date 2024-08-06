
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
import { Checkbox } from '@rmwc/checkbox';
import { TextField } from '@rmwc/textfield';
import { remove, modify } from '../../../actions';
import { TITLE, CODE, MAIN_URL, PREVIEW_URL, ACTIVE } from '../../../constants';
import CardActionRemove from '../../../components/CardActionRemove';


class Container extends Component {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  checkActive = (event) => {
    this.props.change({ active: event.target.checked });
  };

  render() {
    const {
      code, title, removeField, details, main_URL, preview_URL, active
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
          <TextField id={MAIN_URL} value={main_URL || ''} onChange={this.change} label={MAIN_URL} />
        </div>
        <div className="paper">
          <TextField id={PREVIEW_URL} value={preview_URL || ''} onChange={this.change} label={PREVIEW_URL} />
        </div>
        <div className="paper">
          <Checkbox id={ACTIVE} checked={active || false} onChange={this.checkActive} label={ACTIVE} />
        </div>
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
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
