
import { Button } from '@rmwc/button';
import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import { MenuItem, SimpleMenu, TextField } from 'rmwc';
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

  setDefaultMode = (defaultMode) => () => {
    this.props.change({ defaultMode });
  }


  render() {
    const { id, defaultMode, modes = [], timeout = 0, delay = 0, button, project } = this.props;
    const { index } = this.state;
    console.log(modes)
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="paper">
                  <Button onClick={this.addMode}>Add</Button>
                </div>
              </td>
              <td>
                <div className="paper">
                  <SimpleMenu handle={<Button>{defaultMode || `Default`}</Button>}>
                    {
                      (new Array(7)).fill(0).map((v, i) => (
                        <MenuItem key={`${id}/defaultMode/${i}`} value={v} onClick={this.setDefaultMode(i)}>{i || 'None'}</MenuItem>
                      ))
                    }
                  </SimpleMenu>

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
                      <Button onClick={this.removeMode(modes[index])}>Remove</Button>
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
              <Tab key={`${id}/tab/mode/${i}`}>{i + 1}</Tab>
            ))
          }
        </TabBar>
        {
          modes[index] && (
            <CardSmartTopMode id={modes[index]} button={button} project={project} />
          )
        }
      </div>
    );
  }
}
