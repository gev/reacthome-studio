
import { Button } from '@rmwc/button';
import { MenuItem, SimpleMenu } from '@rmwc/menu';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../actions';

const BUTTON_MENU = 'BUTTON_MENU';
const BUTTON_POWER = 'BUTTON_POWER';
const BUTTON_PLUS = 'BUTTON_PLUS';
const BUTTON_MINUS = 'BUTTON_MINUS';

const buttons = [
  null,
  BUTTON_MENU,
  BUTTON_POWER,
  BUTTON_PLUS,
  BUTTON_MINUS
]

class Container extends Component {
  state = { di: 0 }

  setAction = (action) => () => {
    this.props.change({ action });
  }

  render() {
    const { action } = this.props;
    return (
      <div>
        <SimpleMenu handle={<Button>{action || `None`}</Button>}>
          {
            buttons.map((v) => (
              <MenuItem key={v} onClick={this.setAction(v)}>{v || 'None'}</MenuItem>
            ))
          }
        </SimpleMenu>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
