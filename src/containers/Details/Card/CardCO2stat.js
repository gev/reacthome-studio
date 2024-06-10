
import {
  Card,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { List, ListItem, ListItemGraphic } from 'rmwc';
import { add, modify, remove, request } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import RemoveButton from '../../../components/RemoveButton';
import Slider from '../../../components/Slider';
import { ACTION_SETPOINT, CODE, HYSTERESIS, START_VENTILATION, STOP_VENTILATION, TITLE, onStartVentilation, onStopVentilation } from '../../../constants';
import SelectScript from '../SelectScript';

const Item = connect(({ pool }, { id }) => pool[id] || {})((props) => (
  <ListItem>
    <ListItemGraphic icon={<RemoveButton title={props.code || props.title} onClick={props.remove} />} />
    {`${props.index} : ${props.code || props.title || props.id}`}
    <div style={{ right: 12, position: 'absolute' }}>
      <Link to={`/project/${props.project}/${props.id}`}>...</Link>
    </div>
  </ListItem>
));

const Action = (props) => {
  const { action, project } = props;
  const script =
    Array.isArray(props[action])
      ? props[action]
      : props[action]
        ? [props[action]]
        : [];
  const select = (id) => {
    if (!Array.isArray(props[action]) && props[action]) {
      props.change({ [action]: [props[action]] });
    }
    props.add(action, id);
  };
  const remove = (id) => () => {
    if (Array.isArray(props[action])) {
      props.remove(action, id);
    } else {
      props.change({ [action]: [] });
    }
  };
  return (
    <div className="paper">
      <div>
        <List>
          {
            script.map((i, index) =>
              <Item key={i} id={i} index={index} project={project} remove={remove(i)} />
            )
          }
        </List>
      </div>
      <div>
        <SelectScript project={project} onSelect={select} />
      </div>
    </div>
  );
};

class Container extends Component {
  setpoint = (event) => {
    this.props.setSetpoint(event.detail.value);
  }
  setSensor = (sensor) => {
    this.props.change({ sensor });
  }
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  set = (key) => (event) => {
    this.props.change({ [key]: event.target.value });
  };
  on = (on) => (id) => {
    this.props.change({ [on]: id });
  };

  remove = (on) => () => {
    this.props.change({ [on]: null });
  }

  render() {
    const {
      code, title, removeField, setpoint, project
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
          <Slider label="setpoint" value={setpoint || 400} min={200} max={1200} step={10} onInput={this.setpoint} discrete />
        </div>
        <div className="paper">
          <TextField label={HYSTERESIS} value={this.props[HYSTERESIS] || ''} onInput={this.set(HYSTERESIS)} />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td className="paper">
                  <Typography use="caption">{START_VENTILATION}</Typography>
                </td>
                <td className="paper">
                  <SelectScript
                    id={this.props.onStartVentilation}
                    project={project}
                    onSelect={this.on(onStartVentilation)}
                  />
                </td>
                <td className="paper">
                  {
                    this.props.onStartVentilation && (
                      <Typography use="caption" onClick={this.remove(onStartVentilation)}><strong> X </strong></Typography>
                    )
                  }
                </td>
              </tr>
              <tr>
                <td className="paper">
                  <Typography use="caption">{STOP_VENTILATION}</Typography>
                </td>
                <td className="paper">
                  <SelectScript
                    id={this.props.onStopVentilation}
                    project={project}
                    onSelect={this.on(onStopVentilation)}
                  />
                </td>
                <td className="paper">
                  {
                    this.props.onStopVentilation && (
                      <Typography use="caption" onClick={this.remove(onStopVentilation)}><strong> X </strong></Typography>
                    )
                  }
                </td>
              </tr>
            </tbody>
          </table>
          <div className="paper">
            <Typography>Ventilation intensity</Typography>
          </div>
          <Action {...this.props} action="onVentilationIntensity" />
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
    parent, id, field, multiple, daemon
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    setSetpoint: (co2) => request(daemon, { id, type: ACTION_SETPOINT, co2 }),
    change: (payload) => modify(id, payload),
    add: (action, payload) => add(id, action, payload),
    remove: (action, payload) => remove(id, action, payload)
  }, dispatch)
)(Container);
