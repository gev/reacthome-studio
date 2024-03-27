
import { Button } from '@rmwc/button';
import { MenuItem, SimpleMenu } from '@rmwc/menu';
import { Switch } from '@rmwc/switch';
import { Typography } from '@rmwc/typography';
import React from 'react';
import Slider from '../../../components/Slider';
import {
  ACTION_ARTNET,
  ARTNET,
  ARTNET_FADE,
  ARTNET_OFF,
  ARTNET_ON,
  ARTNET_TYPE,
  ARTNET_TYPES
} from '../../../constants';
import connect from '../../Device/connect';


export default connect(ARTNET)((props) => {
  const {
    id, index, value, type, request
  } = props;

  const setType = (t) => () => {
    request({
      type: ACTION_ARTNET, action: ARTNET_TYPE, id, index, value: t
    });
  };

  const setValue = (event) => {
    request({
      type: ACTION_ARTNET, action: ARTNET_FADE, id, index, value: event.detail.value
    });
  };

  const onoff = (event) => {
    request({
      type: ACTION_ARTNET, action: event.target.checked ? ARTNET_ON : ARTNET_OFF, id, index
    });
  };

  return ([
    <tr key="control">
      <td className="paper">
        <Typography use="caption">{index}</Typography>
      </td>
      <td className="paper">
        <SimpleMenu handle={<Button>{ARTNET_TYPES[type] || 'Type'}</Button>}>
          {
            ARTNET_TYPES.map((v, i) => (
              <MenuItem key={v} onClick={setType(i)}>{v}</MenuItem>
            ))
          }
        </SimpleMenu>
      </td>
      <td className="paper" width="100%">
        <Slider
          label="brightness"
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
    </tr>
  ]);
});
