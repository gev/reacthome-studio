
import React, { Component } from 'react';
import Row from './DeviceTempExtRow';

export default class extends Component {
  render() {
    const { temperature_ext = [] } = this.props;
    return (
      <div style={{ maxWidth: '100%', maxHeight: 320, overflowY: 'auto' }}>
        <table>
          <tbody>
            {temperature_ext.map((id, i) => (
              <Row key={id} id={id} index={i + 1} master={this.props.id} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
