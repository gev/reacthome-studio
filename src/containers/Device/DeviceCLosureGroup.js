
import React from 'react';
import { Button } from '@rmwc/button';
import { STOP, OPEN, CLOSE, CLOSURE, GROUP, ACTION_OPEN, ACTION_STOP, ACTION_CLOSE, ACTION_DO } from '../../constants';
import connect from './connect';

type Props = {
  id: string;
  index: number;
  value: ?boolean;
  request: (action: {}) => void;
};

export default connect(GROUP)((props: Props) => {
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
