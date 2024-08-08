
import { Switch } from '@rmwc/switch';
import { Typography } from '@rmwc/typography';
import React from 'react';
import { connect } from 'react-redux';
import Slider from '../../../components/Slider';
import {
  ACTION_DALI,
  DALI_GROUP,
  DALI_LIGHT
} from '../../../constants';
import { send } from '../../../websocket/peer';

const dali = (kind) => connect(
  ({ pool }, { id, index, port }) => pool[`${id}/${kind}/${port !== undefined ? port + '.' + index : index}`] || {}
)(
  (props) => {
    const { id, port, daemon, index, value } = props;

    const setValue = (event) => {
      send(daemon, {
        type: ACTION_DALI, id, kind, port, index, value: event.detail.value
      });
    };

    const onoff = (event) => {
      send(daemon, {
        type: ACTION_DALI, id, kind, port, index, value: event.target.checked ? 254 : 0
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
