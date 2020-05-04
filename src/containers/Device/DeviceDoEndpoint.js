
import React from 'react';
import { Switch } from '@rmwc/switch';
import { ENDPOINT, ACTION_DO } from '../../constants';
import connect from './connect';

type Props = {
  id: string;
  index: number;
  value: ?boolean;
  request: (action: {}) => void;
};

export default connect(ENDPOINT)((props: Props) => {
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
