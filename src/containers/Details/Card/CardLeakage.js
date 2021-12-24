/* eslint-disable camelcase */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { List, ListItem, ListItemGraphic } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { remove, modify, add, makeBind } from '../../../actions';
import { CODE, TITLE, LEAKAGE_SENSOR, VALVE_WATER, onOff, onOn, DO_OFF, DO_ON } from '../../../constants';
import SelectLeakageSensor from './SelectLeakageSensor';
import SelectValveWater from './SelectValveWater';
import SelectScript from '../SelectScript';

type Props = {
  project: ?string,
  code: ?string,
  title: ?string,
  leakage_sensor: ?[],
  valve_water: ?[],
  change: (payload: {}) => void,
  removeField: () => void,
  add: (id: string) => void,
  remove: (id: string) => void
};

type ActionProps = {
  project: string;
  action: number;
  title: string;
  value: ?number;
  test: number;
  change: (id: string, payload: {}) => void;
};

const Action = (props: ActionProps) => {
  const {
    value, action, test, title, project
  } = props;
  const select = (id) => {
    props.change({ [action]: id });
  };
  const clear = () => {
    props.change({ [action]: null });
  };
  const script = props[action];
  return (
    <td className="paper">
      <div>
        <Typography use="caption" theme={(test ? value : !value) ? 'secondary' : 'text-hint-on-background'}>
          {title}
        </Typography>
        {
          script &&
            <Typography use="caption" onClick={clear}><strong> X </strong></Typography>
        }
      </div>
      <div>
        <SelectScript id={script} project={project} onSelect={select} />
      </div>
    </td>
  );
};

const Item = connect(({ pool }, { id }) => pool[id] || {})((props) => (
  <ListItem>
    <ListItemGraphic icon={<IconButton icon="remove" onClick={props.remove} />} />
    {props.code || props.title}
  </ListItem>
));

class Container extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  add = (field) => (sensor) => {
    this.props.add(field, sensor);
  }
  remove = (field, sensor) => () => {
    this.props.remove(field, sensor);
  }
  select = (onLeakageReset) => {
    this.props.change({ onLeakageReset });
  }
  render() {
    const {
      code, title, removeField, project, leakage_sensor, valve_water, change
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
          <SelectLeakageSensor root={project} onSelect={this.add(LEAKAGE_SENSOR)} />
          <List>
            {
              Array.isArray(leakage_sensor) && leakage_sensor.map(i =>
                <Item key={i} id={i} remove={this.remove(LEAKAGE_SENSOR, i)} />)
            }
          </List>
        </div>
        <div className="paper">
          <SelectValveWater root={project} onSelect={this.add(VALVE_WATER)} />
          <List>
            {
              Array.isArray(valve_water) && valve_water.map(i =>
                <Item key={i} id={i} remove={this.remove(VALVE_WATER, i)} />)
            }
          </List>
        </div>
        <table className="paper">
          <tbody>
            <Action {...this.props} action={onOff} test={DO_OFF} title="OFF" change={change} />
            <Action {...this.props} action={onOn} test={DO_ON} title="ON" change={change} />
          </tbody>
        </table>
        <CardActions>
          <CardActionIcons>
            <CardAction icon="remove" onClick={removeField} />
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
    makeBind: (bind) => makeBind(id, bind),
    remove: (type, sensor) => remove(id, type, sensor),
    add: (type, sensor) => add(id, type, sensor),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
