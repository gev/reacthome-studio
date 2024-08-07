
import { Switch } from '@rmwc/switch';
import { Typography } from '@rmwc/typography';
import React from 'react';
import Slider from '../../../components/Slider';
import {
  ACTION_DALI,
  DALI_GROUP,
  DALI_LIGHT
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
          label="brightness"
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
