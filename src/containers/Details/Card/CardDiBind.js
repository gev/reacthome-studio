
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemGraphic } from '@rmwc/list';
import { Typography } from '@rmwc/typography';
import { modify, add, remove } from '../../../actions';
import { onOff, onOn, onHold, DI_OFF, DI_ON, DI_HOLD, onClick, DI_CLICK, onClick2, onClick3, DI_CLICK_2, DI_CLICK_3 } from '../../../constants';
import SelectScript from '../SelectScript';
import { TextField } from '@rmwc/textfield';
import { Checkbox } from '@rmwc/checkbox';
import RemoveButton from '../../../components/RemoveButton';

const Item = connect(({ pool }, { id }) => pool[id] || {})((props) => (
  <ListItem>
    <ListItemGraphic icon={<RemoveButton title={props.code || props.title} onClick={props.remove} />} />
    {props.code || props.title}
    <div style={{ right: 12, position: 'absolute' }}>
      <Link to={`/project/${props.project}/${props.id}`}>...</Link>
    </div>
  </ListItem>
));


const Action = (props) => {
  const {
    value, action, test, project, title, timeout, repeat, interval
  } = props;
  const script =
    Array.isArray(props[action])
      ? props[action]
      : props[action]
        ? [props[action]]
        : [];
  const select = (id) => {
    if (!Array.isArray(props[action])) {
      props.modify({ [action]: [props[action]] });
    }
    props.add(action, id);
  };
  const remove = (id) => () => {
    if (Array.isArray(props[action])) {
      props.remove(action, id);
    } else {
      props.modify({ [action]: [] });
    }
  };
  const modify = (field) => (event) => {
    props.modify({ [field]: event.target.value })
  }
  return (
    <tr className="paper">
      <td style={{ borderRight: 'solid 1px silver', height: '100%' }}>
        <div>
          <Typography use="caption" theme={value === test ? 'secondary' : 'text-hint-on-background'}>
            {title}
          </Typography>
        </div>
      </td>
      <td>
        {
          (action === onClick) && (
            <div>
              <TextField value={timeout} label="timeout" onChange={modify("timeout")} />
            </div>
          )
        }
        {
          (action === onHold) && (
            <table>
              <tbody>
                <tr>
                  <td><Checkbox checked={repeat} label='repeat' onChange={() => {
                    props.modify({ repeat: !repeat })
                  }} /></td>
                  <td><TextField value={interval} label="interval" onChange={modify("interval")} /></td>
                </tr>
              </tbody>
            </table>
          )
        }
        <div>
          <List>
            {
              script.map(i =>
                <Item key={i} id={i} project={project} remove={remove(i)} />
              )
            }
          </List>

        </div>
        <div>
          <SelectScript project={project} onSelect={select} />
        </div>
      </td>
    </tr>
  );
};

const Container = (props) => (
  <table>
    <tbody>
      <Action {...props} action={onOn} test={DI_ON} title="ON" />
      <Action {...props} action={onClick} test={DI_CLICK} title="CLICK" />
      <Action {...props} action={onClick2} test={DI_CLICK_2} title="CLICK2" />
      <Action {...props} action={onClick3} test={DI_CLICK_3} title="CLICK3" />
      <Action {...props} action={onHold} test={DI_HOLD} title="HOLD" />
      <Action {...props} action={onOff} test={DI_OFF} title="OFF" />
    </tbody>
  </table>
);

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    modify: (payload) => modify(id, payload),
    add: (action, payload) => add(id, action, payload),
    remove: (action, payload) => remove(id, action, payload)
  }, dispatch)
)(Container);
