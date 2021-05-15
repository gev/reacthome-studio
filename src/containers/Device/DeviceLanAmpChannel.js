
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { Checkbox } from '@rmwc/checkbox';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import { Slider } from '@rmwc/slider';
import { Typography } from '@rmwc/typography';
import { ACTION_LANAMP, LANAMP } from '../../constants';
import { request } from '../../actions';

const modes = [
  'None',
  'L + R',
  'R + L',
  '1 + 1',
];

const Row = ({ index, source: {active = false, volume = 0} = {}, config }) => (
  <tr>
    <td style={{ width: '30px' }}>
      <div>
        <Typography>{index}</Typography>
      </div>
    </td>
    <td style={{ width: '30px' }}>
      <div>
        <Checkbox
          checked={active}
          onChange={() => {
            config(!active, volume);
          }}
        />
      </div>
    </td>
    <td>
      <div>
        {
          active && (
            <Slider
              value={volume}
              min={0}
              max={100}
              discrete
              onInput={(event) => {
                config(active, event.detail.value);
              }}
            />
          )
        }
      </div>
    </td>
  </tr>
);

const Table = ({ source = [], config }) => (
  <div className="paper">
    <table>
      <tbody>
        <Row index={0} source={source[0]} config={config(0)} />
        <Row index={1} source={source[1]} config={config(1)} />
        <Row index={2} source={source[2]} config={config(2)} />
        <Row index={3} source={source[3]} config={config(3)} />
        <Row index={4} source={source[4]} config={config(4)} />
      </tbody>
    </table>
  </div>
);

class Container extends Component {
  selectType = (mode) => () => {
    this.props.set(mode);
  }

  config = (i) => (j) => (active, volume) => {
    const { mode, source, set } = this.props;
    source[i][j] = { active, volume };
    set(mode, source);
  }

  render() {
    const { mode = 0b00, source = [] } = this.props;
    return (
      <div>
        <div className="paper">
          <SimpleMenu handle={<Button>{modes[mode]}</Button>}>
            {
              modes.map((title, i) => (
                <MenuItem key={i} onClick={this.selectType(i)}>{title}</MenuItem>
              ))
            }
          </SimpleMenu>
        </div>
        {
          mode !== 0b00 && (
            <Table source={source[0]} config={this.config(0)} />
          )
        }
        {
          mode === 0b11 && (
            <Table source={source[1]} config={this.config(1)} />
          )
        }
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id, index }) => pool[`${id}/${LANAMP}/${index}`] || {},
  (dispatch, { id, index, daemon }) => bindActionCreators({
    set: (mode, source) => request(daemon, {
      type: ACTION_LANAMP, id, index, mode, source
    })
  }, dispatch)
)(Container);
