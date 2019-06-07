
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
import { remove, modify, add, makeBind } from '../../../actions';
import { CODE, TITLE, LEAKAGE_SENSOR, VALVE_WATER } from '../../../constants';
import SelectLeakageSensor from './SelectLeakageSensor';
import SelectValveWater from './SelectValveWater';
import SelectScript from '../SelectScript';
import SelectDo from './SelectDo';

type Props = {
  id: string,
  project: ?string,
  code: ?string,
  title: ?string,
  bind: ?string,
  leakage_sensor: ?[],
  valve_water: ?[],
  onLeakageReset: ?String,
  change: (payload: {}) => void,
  makeBind: (bind: string) => void,
  removeField: () => void,
  add: (id: string) => void,
  remove: (id: string) => void
};

const Item = connect(({ pool }, { id }) => pool[id] || {})(({ code, title, remove }) => (
  <ListItem>
    <ListItemGraphic icon={<IconButton icon="remove" onClick={remove} />} />
    {code || title}
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
      code, title, removeField, project, leakage_sensor, valve_water
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
              leakage_sensor && leakage_sensor.map(i =>
                <Item key={i} id={i} remove={this.remove(LEAKAGE_SENSOR, i)} />)
            }
          </List>
        </div>
        <div className="paper">
          <SelectValveWater root={project} onSelect={this.add(VALVE_WATER)} />
          <List>
            {
              valve_water && valve_water.map(i =>
                <Item key={i} id={i} remove={this.remove(VALVE_WATER, i)} />)
            }
          </List>
        </div>
        <div className="paper">
          <SelectDo id={this.props.bind} root={project} onSelect={this.props.makeBind} />
        </div>
        <div className="paper">
          <SelectScript id={this.props.onLeakageReset} project={project} onSelect={this.select} />
        </div>
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
    remove: (field, sensor) => remove(id, field, sensor),
    add: (field, sensor) => add(id, field, sensor),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
