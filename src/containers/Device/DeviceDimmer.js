
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import { Switch } from 'rmwc/Switch';
import { Slider } from 'rmwc/Slider';
import { Button } from 'rmwc/Button';
import { SimpleMenu, MenuItem } from 'rmwc/Menu';
import {
  DIM,
  ACTION_DIMMER,
  DIM_TYPES,
  DIM_FADE,
  DIM_TYPE,
  DIM_ON, DIM_OFF
} from '../../constants';
import Autocomplete from '../Filter';
import connect from './connect';

type Props = {
  id: string;
  n: number;
  daemon: string;
};

type RowProps = {
  id: string;
  daemon: string;
  index: number;
  bind: string;
  type: ?string;
  value: ?boolean;
  request: (action: {}) => void;
};

const Row = connect(DIM)((props: RowProps) => {
  const {
    id, daemon, index, bind, value, type, request, set, get
  } = props;

  const uid = `${id}/${DIM}/${index}`;

  const setType = (t) => () => {
    request({
      type: ACTION_DIMMER, action: DIM_TYPE, id, index, value: t
    });
  };

  const setValue = (event) => {
    request({
      type: ACTION_DIMMER, action: DIM_FADE, id, index, value: event.detail.value
    });
  };

  const onoff = (event) => {
    request({
      type: ACTION_DIMMER, action: event.target.checked ? DIM_ON : DIM_OFF, id, index
    });
  };

  const select = (payload) => {
    set(get(uid).bind, { bind: null });
    set(get(payload).bind, { bind: null });
    set(uid, { bind: payload });
    set(payload, { bind: uid });
  };

  return ([
    <tr key="control">
      <td className="paper">
        <Typography use="caption">{index}</Typography>
      </td>
      <td className="paper">
        <Switch checked={!!value} onChange={onoff} />
      </td>
      <td className="paper" width="100%">
        <Slider
          min={0}
          step={1}
          max={255}
          value={value || 0}
          onInput={setValue}
        />
      </td>
      <td className="paper">
        <SimpleMenu handle={<Button>{DIM_TYPES[type] || 'Type'}</Button>}>
          {
            DIM_TYPES.map((v, i) => (
              <MenuItem key={v} onClick={setType(i)}>{v}</MenuItem>
            ))
          }
        </SimpleMenu>
      </td>
    </tr>,
    <tr key="bind">
      <td />
      <td className="paper" colSpan={3}>
        <Autocomplete id={bind} root={daemon} onSelect={select} />
      </td>
      <td />
    </tr>
  ]);
});

export default class extends Component<Props> {
  render() {
    const { n = 4 } = this.props;
    return (
      <table>
        {
          n === 4 ? (
            <tbody>
              <Row {...this.props} index={1} />
              <Row {...this.props} index={2} />
              <Row {...this.props} index={3} />
              <Row {...this.props} index={4} />
            </tbody>
          ) : null
        }
        {
          n === 8 ? (
            <tbody>
              <Row {...this.props} index={1} />
              <Row {...this.props} index={2} />
              <Row {...this.props} index={3} />
              <Row {...this.props} index={4} />
              <Row {...this.props} index={5} />
              <Row {...this.props} index={6} />
              <Row {...this.props} index={7} />
              <Row {...this.props} index={8} />
            </tbody>
          ) : null
        }
      </table>
    );
  }
}
