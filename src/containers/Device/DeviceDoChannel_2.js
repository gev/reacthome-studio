
import React from 'react';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Switch } from '@rmwc/switch';
import { DO, ACTION_DO } from '../../constants';
import connect from './connect';

type Props = {
  id: string;
  index: number;
  value: ?boolean;
  request: (action: {}) => void;
};

export default connect(DO)((props: Props) => {
  const {
    id, index, value, timeout, request
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

  return (
    <div>
      <div><Typography use="caption">{index}</Typography></div>
      <div><Switch checked={!!value} onChange={setValue} /></div>
      <TextField value={timeout} label="timeout" onInput={setTimeout} type="number" />
    </div>
  );
});
