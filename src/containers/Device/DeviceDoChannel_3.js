
import React from 'react';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import { Button } from '@rmwc/button';
import { Switch } from '@rmwc/switch';
import { DO, ACTION_DO } from '../../constants';
import connect from './connect';

export default connect(DO)((props) => {
  const {
    id, index, value, timeout, request, groupNumber, group
  } = props;

  const setValue = (event) => {
    request({
      type: ACTION_DO, id, index, value: event.target.checked
    });
  };

  const setTimeout = (event) => {
    request({
      type: ACTION_DO, id, index, timeout: parseInt(event.target.value, 10)
    });
  };

  const setGroup = (group) => () => {
    request({
      type: ACTION_DO, id, index, group 
    });
  };

  return (
    <div>
      <div className="paper" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography use="caption">{index}</Typography>
        <SimpleMenu handle={<Button>{group || index}</Button>}>
          {
            Array(groupNumber).fill(0).map((_, i) => (
              <MenuItem key={i+1} onClick={setGroup(i+1)}>{i+1}</MenuItem>
            ))
          }
        </SimpleMenu>
        <Switch checked={!!value} onChange={setValue} />
      </div>
      <TextField value={timeout} label="timeout" onInput={setTimeout} type="number" />
    </div>
  );
});
