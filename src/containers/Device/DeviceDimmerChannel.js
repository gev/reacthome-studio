
import React from 'react';
import { Typography } from '@rmwc/typography';
import { Switch } from '@rmwc/switch';
import { Slider } from '@rmwc/slider';
import { Button } from '@rmwc/button';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import {
  ACTION_DIMMER,
  DIM_TYPES,
  DIM_SET,
  DIM_TYPE,
  DIM_ON, DIM_OFF, DIM
} from '../../constants';
import connect from './connect';

export default connect(DIM)((props) => {
  const {
    id, index, value, type, request, groupNumber, group
  } = props;

  const setType = (value) => () => {
    request({
      type: ACTION_DIMMER, action: DIM_TYPE, id, index, value, 
    });
  };

  const setGroup = (value) => () => {
    request({
      type: ACTION_DIMMER, action: DIM_GROUP, id, index, value, 
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
    <tr key="r1">
      <td className="paper">
        <Typography use="caption">{index}</Typography>
      </td>
      <td className="paper" width="100%">
        <Slider
          min={0}
          step={1}
          max={255}
          value={value || 0}
          onInput={setValue}
          discrete
        />
      </td>
      <td className="paper">
        <Switch checked={!!value} onChange={onoff} />
      </td>
    </tr>,
    <tr key='r2'>
      <td>
        <SimpleMenu handle={<Button>{group || index}</Button>}>
          {
            Array(groupNumber).fill(0).map((_, i) => (
              <MenuItem key={i+1} onClick={setGroup(i+1)}>{i+1}</MenuItem>
            ))
          }
        </SimpleMenu>
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
  ]);
});
