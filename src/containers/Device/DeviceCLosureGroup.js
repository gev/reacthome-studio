
import { Button } from '@rmwc/button';
import React from 'react';
import { ACTION_CLOSE, ACTION_DO, ACTION_OPEN, ACTION_STOP, GROUP } from '../../constants';
import connect from './connect';

export default connect(GROUP)((props) => {
  const {
    id, index, request
  } = props;

  const req = (value) => () => {
    request({
      type: ACTION_DO, id, index, value
    });
  };

  return (
    <div className="paper">
      <Button onClick={req(ACTION_OPEN)}>Open</Button>
      <Button onClick={req(ACTION_STOP)}>Stop</Button>
      <Button onClick={req(ACTION_CLOSE)}>Close</Button>
    </div>
  );
});
