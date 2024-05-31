
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import { ACTION_LANAMP, LANAMP } from '../../constants';
import { request } from '../../actions';
import DeviceLanAmpZone from './DeviceLanAmpZone';

const modes = [
  'None',
  'L + R',
  'R + L',
  '1 + 1',
];

class Container extends Component {
  selectType = (mode) => () => {
    this.props.set(mode);
  }

  render() {
    const { mode = 0b00, id, daemon, index } = this.props;
    return (
      <div>
        <div className="paper">
          <SimpleMenu handle={<Button>{modes[mode]}</Button>}>
            {
              modes.map((title, i) => (
                <MenuItem key={`${id}/mode/${i}`} onClick={this.selectType(i)}>{title}</MenuItem>
              ))
            }
          </SimpleMenu>
        </div>
        {
          (mode === 0b01 || mode === 0b10) && (
            <DeviceLanAmpZone daemon={daemon} id={`${id}/stereo/${index}`} />
          )
        }
        {
          mode === 0b11 && [
            <DeviceLanAmpZone key="1" daemon={daemon} id={`${id}/mono/${(2 * index) - 1}`} />,
            <DeviceLanAmpZone key="2" daemon={daemon} id={`${id}/mono/${(2 * index)}`} />
          ]
        }
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id, index }) => pool[`${id}/${LANAMP}/${index}`] || {},
  (dispatch, { id, index, daemon }) => bindActionCreators({
    set: (mode) => request(daemon, {
      type: ACTION_LANAMP, id, index, mode
    })
  }, dispatch)
)(Container);
