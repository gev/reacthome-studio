
import React from 'react';
import { Button } from '@rmwc/button';
import { ENDPOINT, STOP, OPEN, CLOSE, CLOSURE } from '../../constants';
import connect from './connect';

type Props = {
  id: string;
  index: number;
  value: ?boolean;
  request: (action: {}) => void;
};

export default connect(ENDPOINT)((props: Props) => {
  const {
    id, index, request
  } = props;

  const req = (value) => () => {
    request({
      type: CLOSURE, id, index, value
    });
  };

  return (
    <div className="paper">
      <Button onClick={req(OPEN)}>Open</Button>
      <Button onClick={req(STOP)}>Stop</Button>
      <Button onClick={req(CLOSE)}>Close</Button>
    </div>
  );
});
