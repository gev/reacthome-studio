
import React from 'react';
import { Typography } from '@rmwc/typography';
import { Switch } from '@rmwc/switch';
import { Slider } from '@rmwc/slider';
import {
  ACTION_DALI,
  DALI_FADE,
  DALI_ON, DALI_OFF, DALI_LIGHT, DALI_GROUP,
} from '../../../constants';
import connect from '../../Device/connect';

const dali = (kind) => connect(kind)((props) => {
  const {
    id, index, value, request
  } = props;

  const setValue = (event) => {
    request({
      type: ACTION_DALI, id, kind, index, value: event.detail.value
    });
  };

  const onoff = (event) => {
    request({
      type: ACTION_DALI, id, kind, index, value: event.target.checked ? 254 : 0
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
          max={254}
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


export const DaliLight = dali(DALI_LIGHT);
export const DaliGroup = dali(DALI_GROUP);
