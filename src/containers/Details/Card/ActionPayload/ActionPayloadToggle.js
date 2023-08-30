
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, ListItem, ListItemGraphic, ListItemText } from '@rmwc/list';
import { Typography } from '@rmwc/typography';
import { modify } from '../../../../actions';
import Autocomplete from '../../../Filter';
import SelectScript from '../../SelectScript';
import { onOff, onOn } from '../../../../constants';
import RemoveButton from '../../../../components/RemoveButton';

const Item = connect(({ pool }, { id }) => pool[id] || {})(({ code, title, remove }) => (
  <ListItem>
    <ListItemGraphic icon={<RemoveButton title={code || title} icon="remove" onClick={remove} />} />
    <ListItemText>{code || title}</ListItemText>
  </ListItem>
));

const Action = ({
  action, title, payload, project, on
}) => {
  const select = () => (script) => on(action, script);
  const remove = () => () => on(action, null);
  return (
    <tr>
      <td>
        <Typography use="caption">{title}</Typography>
        {
          payload[action] &&
          <Typography use="caption" onClick={remove(action)}><strong> X </strong></Typography>
        }
      </td>
      <td>
        <SelectScript id={payload[action]} project={project} onSelect={select(action)} />
      </td>

    </tr>
  );
};

class Container extends Component {
  state = {};

  select = (subj) => {
    this.setState({ subj });
    this.props.add(subj);
  };

  remove = (subj) => () => {
    this.props.remove(subj);
  }

  render() {
    const {
      id, project, payload = {}, on
    } = this.props;
    return (
      <div className="paper">
        <Autocomplete id={this.state.subj} root={project} onSelect={this.select} />
        <List>
          {
            Array.isArray(payload.test) && payload.test.map(i => <Item key={i} id={i} remove={this.remove(i)} />)
          }
        </List>
        <table>
          <tbody>
            <Action id={id} project={project} on={on} payload={payload} action={onOff} title="OFF" />
            <Action id={id} project={project} on={on} payload={payload} action={onOn} title="ON" />
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, payload = {} }) => bindActionCreators({
    on: (on, script) => modify(id, { payload: { ...payload, [on]: script } }),
    add: (subj) => {
      const { test = [] } = payload;
      if (test.includes(subj)) return {};
      return modify(id, { payload: { ...payload, test: [...test, subj] } });
    },
    remove: (subj) => {
      const { test = [] } = payload;
      return modify(id, { payload: { ...payload, test: test.filter(i => i !== subj) } });
    }
  }, dispatch)
)(Container);
