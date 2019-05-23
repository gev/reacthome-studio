
import React from 'react';
import { Typography } from '@rmwc/typography';
import { Switch } from '@rmwc/switch';
import { Slider } from '@rmwc/slider';
import { Button } from '@rmwc/button';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import {
  ARTNET,
  ACTION_ARTNET,
  ARTNET_TYPES,
  ARTNET_FADE,
  ARTNET_TYPE,
  ARTNET_ON, ARTNET_OFF
} from '../../../constants';
import connect from '../../Device/connect';

type Props = {
  id: string;
  index: number;
  bind: string;
  type: ?string;
  value: ?boolean;
  request: (action: {}) => void;
};

export default connect(ARTNET)((props: Props) => {
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
