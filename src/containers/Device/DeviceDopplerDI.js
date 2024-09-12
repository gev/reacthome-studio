
import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import DeviceALED from './DeviceALED';
import DeviceDi from './DeviceDi';
import DeviceDoppler from './DeviceDoppler';


export default class extends Component {
  state = { index: 0 }


  select = ({ detail: { index } }) => {
    this.setState({ index });
  };

  render() {
    const { index } = this.state;
    const { di, doppler } = this.props;
    return (
      <div className="paper">
        <TabBar
          activeTabIndex={index}
          onActivate={this.select}
        >
          <Tab>Inputs</Tab>
          <Tab>Doppler</Tab>
          <Tab>ALED</Tab>
        </TabBar>
        {
          index === 0 && (
            <DeviceDi {...this.props} n={di} />
          )
        }
        {
          index === 1 && (
            <DeviceDoppler {...this.props} n={doppler} />
          )
        }
        {
          index === 2 && (
            <DeviceALED {...this.props} />
          )
        }
      </div>
    );
  }
}
