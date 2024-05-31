
import { MenuItem, SimpleMenu } from '@rmwc/menu';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { v4 } from 'uuid';
import { add, set } from '../../actions';
import { DRIVER, DRIVER_TYPES } from '../../constants';


class Container extends Component {
  select = (type) => () => {
    const id = v4();
    this.props.set(id, { type });
    this.props.add(this.props.id, DRIVER, id);
  }

  render() {
    const { handle } = this.props;
    return (
      <SimpleMenu handle={handle} style={{ minWidth: 200 }}>
        {
          Object.entries(DRIVER_TYPES).map(([id, { title }]) => (
            <MenuItem key={id} onClick={this.select(id)}>{title}</MenuItem>
          ))
        }
      </SimpleMenu>
    );
  }
}

export default connect(
  () => { },
  (dispatch) => bindActionCreators({ set, add }, dispatch)
)(Container);
