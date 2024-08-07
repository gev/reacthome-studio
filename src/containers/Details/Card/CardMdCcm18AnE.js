
import {
  Card,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { Radio } from '@rmwc/radio';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, MenuItem, SimpleMenu } from 'rmwc';
import { makeBind, modify, remove } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import { ACTION_SET, CODE, TITLE } from '../../../constants';
import { send } from '../../../websocket/peer';
import CardMdCcm18AnEAC from './CardMdCcm18AnEAC';
import SelectModbus from './SelectModbus';

const Check = ({ checked, onChange, label }) => (
  <td>
    <div><Typography use="caption">{label}</Typography></div>
    <div><Radio checked={checked} onChange={onChange} /></div>
  </td>
);

class Container extends Component {
  state = { index: 1 };
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  select = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }
  setIndex = (index) => () => {
    this.setState({ index });
  }
  setNumberAC = ({ target: { value } }) => {
    const { daemon, id, change } = this.props;
    let numberAC = parseInt(value, 10);
    if (numberAC < 0) numberAC = 0;
    if (numberAC > 64) numberAC = 64;
    send(daemon, { type: ACTION_SET, id, payload: { numberAC } });
  }
  render() {
    const { index } = this.state;
    const {
      id, daemon, code, project, bind, title, removeField, numberAC = 0
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <SelectModbus id={bind} root={project} onSelect={this.select} />
        </div>
        <table>
          <tbody>
            <tr>
              <td className="paper">
                <TextField value={numberAC} label="Number AC" type="number" onChange={this.setNumberAC} />
              </td>
              {
                numberAC > 0 && (
                  <td className="paper">
                    <SimpleMenu handle={<Button>AC {index}</Button>}>
                      {
                        Array(numberAC).fill(0).map((_, i) => (
                          <MenuItem key={`${id}/ac/${i + 1}`} onClick={this.setIndex(i + 1)}>{i + 1}</MenuItem>
                        ))
                      }
                    </SimpleMenu>
                  </td>

                )
              }
            </tr>
          </tbody>
        </table>
        <div className="paper">
          {
            numberAC > 0 && (
              <CardMdCcm18AnEAC id={id} index={index} daemon={daemon} />
            )
          }
        </div>
        <CardActions>
          <CardActionIcons>
            <CardActionRemove remove={removeField} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, {
    parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    change: (payload) => modify(id, payload),
    makeBind
  }, dispatch)
)(Container);
