
import { Switch } from '@rmwc/switch';
import { Typography } from '@rmwc/typography';
import React from 'react';
import { ACTION_DO, DO } from '../../constants';
import connect from './connect';


export default connect(DO)((props) => {
  const {
    id, index, title, value, request
  } = props;

  const setValue = (event) => {
    request({
      type: ACTION_DO, id, index, value: event.target.checked
    });
  };

  return (
    <div>
      <div><Typography use="caption">{title || index}</Typography></div>
      <div><Switch checked={!!value} onChange={setValue} /></div>
    </div>
  );
});
