
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Checkbox } from '@rmwc/checkbox';
import { Slider } from '@rmwc/slider';
import { Typography } from '@rmwc/typography';
import { ACTION_MULTIROOM_ZONE } from '../../constants';
import { request } from '../../actions';

const Row = ({ index, source, config }) => {
  const active = source && source.active || false;
  const volume = source && source.volume || 0;
  return (
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
                max={255}
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
};

class Container extends Component {
  config = (index) => (active, volume) => {
    const { source = [], set } = this.props;
    source[index] = { active, volume };
    set(source);
  }

  render() {
    const { source = [] } = this.props;
    return (
      <div className="paper">
        <table>
          <tbody>
            <Row index={0} source={source[0]} config={this.config(0)} />
            <Row index={1} source={source[1]} config={this.config(1)} />
            <Row index={2} source={source[2]} config={this.config(2)} />
            <Row index={3} source={source[3]} config={this.config(3)} />
            <Row index={4} source={source[4]} config={this.config(4)} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, daemon }) => bindActionCreators({
    set: (source) => request(daemon, {
      type: ACTION_MULTIROOM_ZONE, id, source
    })
  }, dispatch)
)(Container);
