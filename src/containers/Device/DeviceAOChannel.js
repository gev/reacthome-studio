
import React from 'react';
import { Typography } from '@rmwc/typography';
import { Switch } from '@rmwc/switch';
import { Slider } from '@rmwc/slider';
import {
  ACTION_DIMMER,
  DIM_SET,
  DIM_ON, DIM_OFF, AO
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

export default connect(AO)((props: Props) => {
  const {
    id, index, value, request
  } = props;

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
    </tr>
  ]);
});
