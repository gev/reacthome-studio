
import React, { Component } from 'react';
import { Typography } from 'rmwc/Typography';
import { Switch } from 'rmwc/Switch';
import { Slider } from 'rmwc/Slider';
import { Button } from 'rmwc/Button';
import { SimpleMenu, MenuItem } from 'rmwc/Menu';
import connect from './connect';
import { ACTION_DIMMER, DIM_TYPES, DIM_FADE, DIM_TYPE, DIM_ON, DIM_OFF } from '../../constants';

type Props = {
  id: string;
  daemon: string;
};

type RowProps = {
  id: string;
  daemon: string;
  index: number;
  type: ?string;
  value: ?boolean;
  request: (action: {}) => void;
};

const Row = connect((props: RowProps) => {
  const {
    id, index, value, type, request
  } = props;

  const setType = (t) => () => {
    request({
      type: ACTION_DIMMER, action: DIM_TYPE, id, index, value: t
    });
  };

  const setValue = (event) => {
    request({
      type: ACTION_DIMMER, action: DIM_FADE, id, index, value: event.target.value
    });
  };

  const onoff = (event) => {
    request({
      type: ACTION_DIMMER, action: event.target.checked ? DIM_ON : DIM_OFF, id, index
    });
  };

  return (
    <tr>
      <td>
        <Typography use="caption">{index}</Typography>
      </td>
      <td>
        <Switch checked={!!value} onChange={onoff} />
      </td>
      <td width="100%">
        <Slider
          min={0}
          step={1}
          max={255}
          value={value || 0}
          onInput={setValue}
          displayMarkers
        />
      </td>
      <td>
        <SimpleMenu handle={<Button>{DIM_TYPES[type] || 'Type'}</Button>}>
          {
            DIM_TYPES.map((v, i) => (
              <MenuItem key={v} onClick={setType(i)}>{v}</MenuItem>
            ))
          }
        </SimpleMenu>
      </td>
    </tr>
  );
});

export default class extends Component<Props> {
  render() {
    const { id, daemon } = this.props;
    return (
      <table>
        <tbody>
          <Row id={id} daemon={daemon} index={1} />
          <Row id={id} daemon={daemon} index={2} />
          <Row id={id} daemon={daemon} index={3} />
          <Row id={id} daemon={daemon} index={4} />
        </tbody>
      </table>
    );
  }
}
