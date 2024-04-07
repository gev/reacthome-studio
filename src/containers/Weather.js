
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { modify } from '../actions';
import { SUNRISE, SUNSET, onSunrise, onSunset } from '../constants';
import SelectScript from './Details/SelectScript';

class Container extends Component {
  on = (action) => (script) => {
    this.props.modify({ [action]: script });
  }
  clear = (action) => () => {
    this.props.modify({ [action]: null });
  }
  render() {
    const {
      id, weather: { sys = {} } = {}
    } = this.props;
    const sunrise = new Date(sys.sunrise);
    const sunset = new Date(sys.sunset);
    return (
      <div>
        <div className="paper">
          <table>
            <tbody>
              <tr>
                <td>{SUNRISE}</td>
                <td>{sunrise.toLocaleString()}</td>
                <td>
                  <SelectScript
                    id={this.props.onSunrise}
                    project={id}
                    onSelect={this.on(onSunrise)}
                  />
                </td>
                <td>
                  {
                    this.props.onSunrise &&
                    <Typography use="caption" onClick={this.clear(onSunrise)}><strong> X </strong></Typography>
                  }
                </td>
              </tr>
              <tr>
                <td>{SUNSET}</td>
                <td>{sunset.toLocaleString()}</td>
                <td>
                  <SelectScript
                    id={this.props.onSunset}
                    project={id}
                    onSelect={this.on(onSunset)}
                  />
                </td>
                <td>
                  {
                    this.props.onSunset &&
                    <Typography use="caption" onClick={this.clear(onSunset)}><strong> X </strong></Typography>
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {
          // JSON.stringify(weather, null, 2)
        }
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    modify: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
