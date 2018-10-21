
import React, { Component } from 'react';
import Row from './DeviceDimmerChannel';

type Props = {
  id: string;
  n: number;
  daemon: string;
};

export default class extends Component<Props> {
  render() {
    const { n = 4 } = this.props;
    return (
      <table>
        {
          n === 4 ? (
            <tbody>
              <Row {...this.props} index={1} />
              <Row {...this.props} index={2} />
              <Row {...this.props} index={3} />
              <Row {...this.props} index={4} />
            </tbody>
          ) : null
        }
        {
          n === 8 ? (
            <tbody>
              <Row {...this.props} index={1} />
              <Row {...this.props} index={2} />
              <Row {...this.props} index={3} />
              <Row {...this.props} index={4} />
              <Row {...this.props} index={5} />
              <Row {...this.props} index={6} />
              <Row {...this.props} index={7} />
              <Row {...this.props} index={8} />
            </tbody>
          ) : null
        }
      </table>
    );
  }
}
