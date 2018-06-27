
import React from 'react';
import { Typography } from 'rmwc/Typography';
import { Switch } from 'rmwc/Switch';
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
    id, index, value, request
  } = props;

  const setValue = (event) => {
    request({
      type: ACTION_DO, id, index, value: event.target.checked
    });
  };

  return (
    <div>
      <div><Typography use="caption">{index}</Typography></div>
      <div><Switch checked={!!value} onChange={setValue} /></div>
    </div>
  );
});
