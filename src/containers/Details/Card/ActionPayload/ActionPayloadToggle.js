
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, ListItem, ListItemGraphic } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import { Typography } from '@rmwc/typography';
import { modify } from '../../../../actions';
import Autocomplete from '../../../Filter';
import SelectScript from '../../SelectScript';
import { onOff, onOn } from '../../../../constants';

type Props = {
  id: string;
  project: string;
  payload: ?{};
  on: (on: string, script: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
};

const Item = connect(({ pool }, { id }) => pool[id] || {})(({ code, title, remove }) => (
  <ListItem>
    <ListItemGraphic icon={<IconButton icon="remove" onClick={remove} />} />
    {code || title}
  </ListItem>
));

const Action = ({
  action, title, payload, project, on
}) => {
  const select = () => (script) => on(action, script);
  const remove = () => () => on(action, null);
  return [
    <td key="title">
      <Typography use="caption">{title}</Typography>
      {
        payload[action] &&
          <Typography use="caption" onClick={remove(action)}><strong> X </strong></Typography>
      }
    </td>,
    <td key="script">
      <SelectScript id={payload[action]} project={project} onSelect={select(action)} />
    </td>
  ];
};

class Container extends Component<Props> {
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
            <tr>
              <Action id={id} project={project} on={on} payload={payload} action={onOff} title="OFF" />
              <Action id={id} project={project} on={on} payload={payload} action={onOn} title="ON" />
            </tr>
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
