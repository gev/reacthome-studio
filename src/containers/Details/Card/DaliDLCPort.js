
import { Tab, TabBar } from '@rmwc/tabs';
import { TextField } from '@rmwc/textfield';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { modify } from '../../../actions';
import { ACTION_SET, DALI_GROUP, DALI_LIGHT } from '../../../constants';
import { send } from '../../../websocket/peer';
import { DaliGroup, DaliLight } from './DaliChannel';

class Container extends Component {
  state = { tabIndex: 0 };

  bind = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }

  select = ({ detail: { index } }) => {
    this.setState({ tabIndex: index });
  }

  setNumber = (name, max) => ({ target: { value } }) => {
    const { daemon, id, port } = this.props;
    let number = parseInt(value, 10);
    if (number < 0) number = 0;
    if (number > max) number = max;
    send(daemon, { type: ACTION_SET, id: id, payload: { [name + port]: number } });
  }

  render() {
    const { tabIndex } = this.state;
    const { id, port } = this.props;
    const numberLights = this.props[`numberLights${port}`] || 0;
    const numberGroups = this.props[`numberGroups${port}`] || 0;
    const lights = [];
    for (let i = 0; i < numberLights; i += 1) {
      const idx = `${port}.${i}`;
      lights.push(<DaliLight {...this.props} key={`${id}/${DALI_LIGHT}/${idx}`} index={idx} />);
    }
    const groups = [];
    for (let i = 0; i < numberGroups; i += 1) {
      const idx = `${port}.${i}`;
      groups.push(<DaliGroup {...this.props} key={`${id}/${DALI_GROUP}/${idx}`} index={idx} />);
    }
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <TextField value={numberLights} label="Lights" type="number" onChange={this.setNumber('numberLights', 64)} />
              </td>
              <td className="paper">
                <TextField value={numberGroups} label="Groups" type="number" onChange={this.setNumber('numberGroups', 16)} />
              </td>
            </tr>
          </tbody>
        </table>
        <TabBar
          activeTabIndex={tabIndex}
          onActivate={this.select}
        >
          <Tab>Lights</Tab>
          <Tab>Groups</Tab>
        </TabBar>
        <div key={`${id}/tab/${tabIndex}`} tabIndex={tabIndex} style={{ maxWidth: '100%', maxHeight: 600, overflowY: 'auto' }}>
          <table>
            <tbody>
              {
                tabIndex === 0 && lights
              }
              {
                tabIndex === 1 && groups
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload),
  }, dispatch)
)(Container);
