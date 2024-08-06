
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { remove, modify, makeBind } from '../../../actions';
import { CODE, TITLE, OPEN_CLOSE, LEFT_RIGTH, RIGTH_LEFT, UP_DOWN } from '../../../constants';
import DeviceClosure from './DeviceClosure';
import SelectClosure from './SelectClosure';
import Closure from './CardClosureBind';
import CardActionRemove from '../../../components/CardActionRemove';


const Radio = ({
  label, option, value, onSelect
}) => (
  <Button
    onClick={() => {
      onSelect(option);
    }}
    outlined={option === value}
  >{label}
  </Button>
);

class Container extends Component {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  setKind = (kind) => {
    this.props.change({ kind });
  }
  select = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }
  render() {
    const {
      code, project, daemon, bind, title, kind = OPEN_CLOSE, removeField
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
          <div>
            <Radio value={kind} onSelect={this.setKind} label={OPEN_CLOSE} option={OPEN_CLOSE} />
            <Radio value={kind} onSelect={this.setKind} label={UP_DOWN} option={UP_DOWN} />
          </div>
          <div>
            <Radio value={kind} onSelect={this.setKind} label={LEFT_RIGTH} option={LEFT_RIGTH} />
            <Radio value={kind} onSelect={this.setKind} label={RIGTH_LEFT} option={RIGTH_LEFT} />
          </div>
        </div>
        <div className="paper">
          <SelectClosure id={bind} root={project} onSelect={this.select} />
        </div>
        {
          bind && [
            <table key="bind">
              <tbody>
                <Closure id={bind} project={project} />
              </tbody>
            </table>,
            <DeviceClosure id={bind} daemon={daemon} />
          ]
        }
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
    project, parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    change: (payload) => modify(id, payload),
    makeBind
  }, dispatch)
)(Container);
