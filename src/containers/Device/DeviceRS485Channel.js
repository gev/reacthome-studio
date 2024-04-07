/* eslint-disable camelcase */

import { Button } from '@rmwc/button';
import { Checkbox } from '@rmwc/checkbox';
import { MenuItem, SimpleMenu } from '@rmwc/menu';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React from 'react';
import {
  ACTION_RS485_MODE,
  RS485,
  RS485_LINE_CONTROLS
} from '../../constants';
import connect from './connect';

export default connect(RS485)((props) => {
  const setLineControl = (line_control) => () => {
    props.request({
      ...props, type: ACTION_RS485_MODE, line_control
    });
  };

  const setBaud = (event) => {
    props.request({
      ...props, type: ACTION_RS485_MODE, baud: parseInt(event.target.value, 10)
    });
  };

  const setMode = (event) => {
    props.request({
      ...props, type: ACTION_RS485_MODE, is_rbus: event.target.checked
    });
  };

  const {
    index, baud, line_control, is_rbus = true
  } = props;

  return (
    <tr>
      <td className="paper">
        <Typography use="caption">{index}</Typography>
      </td>
      <td className="paper">
        <Checkbox checked={is_rbus} onChange={setMode} label="Rbus" />
      </td>
      <td className="paper">
        {
          !is_rbus && (
            <TextField value={String(baud || '')} onChange={setBaud} placeholder="Baud" />
          )
        }
      </td>
      <td className="paper">
        {
          !is_rbus && (
            <SimpleMenu handle={<Button>{RS485_LINE_CONTROLS[line_control] || 'Line Control'}</Button>}>
              {
                RS485_LINE_CONTROLS.map((v, i) => (
                  <MenuItem key={v} onClick={setLineControl(i)}>{v}</MenuItem>
                ))
              }
            </SimpleMenu>
          )
        }
      </td>
    </tr>
  );
});
