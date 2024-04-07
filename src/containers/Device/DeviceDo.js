
import { Switch } from '@rmwc/switch';
import React from 'react';
import { ACTION_DO } from '../../constants';
import connect from './connect';


export default connect()((props) => {
  const {
    id, index, value, request
  } = props;

  const setValue = (event) => {
    request({
      type: ACTION_DO, id, index, value: event.target.checked
    });
  };

  return (
    <div><Switch checked={!!value} onChange={setValue} /></div>
  );
});
