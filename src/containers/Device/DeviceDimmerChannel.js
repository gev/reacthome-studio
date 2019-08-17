
import React from 'react';
import { Typography } from '@rmwc/typography';
import { Switch } from '@rmwc/switch';
import { Slider } from '@rmwc/slider';
import { Button } from '@rmwc/button';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import {
  DIM,
  ACTION_DIMMER,
  DIM_TYPES,
  DIM_SET,
  DIM_TYPE,
  DIM_ON, DIM_OFF
} from '../../constants';
import connect from './connect';

type Props = {
  id: string;
  index: number;
  bind: string;
  type: ?string;
  value: ?boolean;
  request: (action: {}) => void;
};

export default connect(DIM)((props: Props) => {
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
      type: ACTION_DIMMER, action: DIM_SET, id, index, value: event.detail.value
    });
  };

  const onoff = (event) => {
    request({
      type: ACTION_DIMMER, action: event.target.checked ? DIM_ON : DIM_OFF, id, index
    });
  };

  return ([
    <tr key="control">
      <td className="paper">
        <Typography use="caption">{index}</Typography>
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
        <Switch checked={!!value} onChange={onoff} />
      </td>
    </tr>
  ]);
});
