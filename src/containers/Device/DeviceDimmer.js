
import React, { Component } from 'react';
import Row from './DeviceDimmerChannel';

export default class extends Component {
  render() {
    const { n = 4 } = this.props;
    return (
      <table>
        {
          n === 3 ? (
            <tbody>
              <Row {...this.props} index={1} groupNumber={3} />
              <Row {...this.props} index={2} groupNumber={3} />
              <Row {...this.props} index={3} groupNumber={3} />
            </tbody>
          ) : null
        }
        {
          n === 4 ? (
            <tbody>
              <Row {...this.props} index={1} groupNumber={4} />
              <Row {...this.props} index={2} groupNumber={4} />
              <Row {...this.props} index={3} groupNumber={4} />
              <Row {...this.props} index={4} groupNumber={4} />
            </tbody>
          ) : null
        }
        {
          n === 8 ? (
            <tbody>
              <Row {...this.props} index={1} groupNumber={8} />
              <Row {...this.props} index={2} groupNumber={8} />
              <Row {...this.props} index={3} groupNumber={8} />
              <Row {...this.props} index={4} groupNumber={8} />
              <Row {...this.props} index={5} groupNumber={8} />
              <Row {...this.props} index={6} groupNumber={8} />
              <Row {...this.props} index={7} groupNumber={8} />
              <Row {...this.props} index={8} groupNumber={8} />
            </tbody>
          ) : null
        }
        {
          n === 12 ? (
            <tbody>
              <Row {...this.props} index={1} groupNumber={12} />
              <Row {...this.props} index={2} groupNumber={12} />
              <Row {...this.props} index={3} groupNumber={12} />
              <Row {...this.props} index={4} groupNumber={12} />
              <Row {...this.props} index={5} groupNumber={12} />
              <Row {...this.props} index={6} groupNumber={12} />
              <Row {...this.props} index={7} groupNumber={12} />
              <Row {...this.props} index={8} groupNumber={12} />
              <Row {...this.props} index={9} groupNumber={12} />
              <Row {...this.props} index={10} groupNumber={12} />
              <Row {...this.props} index={11} groupNumber={12} />
              <Row {...this.props} index={12} groupNumber={12} />
            </tbody>
          ) : null
        }
      </table>
    );
  }
}
