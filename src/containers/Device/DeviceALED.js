
import React, { Component } from 'react';
import { Tab, TabBar } from 'rmwc';
import DeviceALEDGroup from './DeviceALEDGroup';



export default class extends Component {
  state = { tabIndex: 0 };

  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }
  render() {
    const { tabIndex } = this.state;
    const { id, daemon } = this.props;
    return (
      <div>
        <TabBar activeTabIndex={tabIndex} onActivate={this.select}>
          <Tab>1</Tab>
          <Tab>2</Tab>
          <Tab>3</Tab>
          <Tab>4</Tab>
          <Tab>5</Tab>
          <Tab>6</Tab>
          <Tab>7</Tab>
          <Tab>8</Tab>
          <Tab>9</Tab>
          <Tab>10</Tab>
        </TabBar>
        <div className="paper">
          <DeviceALEDGroup id={id} index={tabIndex + 1} daemon={daemon} />
        </div>
      </div>
    );
  }
}
