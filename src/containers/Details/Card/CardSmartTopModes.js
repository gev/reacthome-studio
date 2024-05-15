
import { Button } from '@rmwc/button';
import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import { TextField } from 'rmwc';
import CardSmartTopMode from './CardSmartTopMode';


export default class extends Component {
  state = { index: 0 }

  select = ({ detail: { index } }) => {
    this.setState({ index });
  }

  addMode = () => {
    const { modes = [], addMode } = this.props;
    if (modes.length < 6) {
      addMode()
    }
  }

  removeMode = (id) => () => {
    const { removeMode } = this.props;
    removeMode(id);
  }

  setTimeout = (event) => {
    const timeout = parseInt(event.target.value, 10) || 0;
    if (timeout >= 0) {
      this.props.change({ timeout });
    }
  }

  setDelay = (event) => {
    const delay = parseInt(event.target.value, 10) || 0;
    if (delay >= 0) {
      this.props.change({ delay });
    }
  }


  render() {
    const { id, modes = [], timeout = 0, delay = 0, button } = this.props;
    const { index } = this.state;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="paper">
                  <Button onClick={this.addMode}>Add mode</Button>
                </div>
              </td>
              <td>
                <div className="paper">
                  <TextField label="timeout" value={timeout || ''} onInput={this.setTimeout} type="number" />
                </div>
              </td>
              <td>
                <div className="paper">
                  <TextField label="delay" value={delay || ''} onInput={this.setDelay} type="number" />
                </div>
              </td>
              {
                modes[index] && (
                  <td>
                    <div className="paper">
                      <Button onClick={this.removeMode(modes[index])}>Remove mode</Button>
                    </div>
                  </td>
                )
              }

            </tr>
          </tbody>
        </table>
        <TabBar activeTabIndex={index} onActivate={this.select}>
          {
            modes.map((_, i) => (
              <Tab key={`${id}/mode/${i}`}>{i + 1}</Tab>
            ))
          }
        </TabBar>
        {
          modes[index] && (
            <CardSmartTopMode id={modes[index]} button={button} />
          )
        }
      </div>
    );
  }
}
