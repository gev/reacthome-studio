
import React from 'react';
import { Typography } from '@rmwc/typography';
import { Slider } from '@rmwc/slider';
import { ENDPOINT } from '../../constants';
import connect from './connect';

type Props = {
  id: string;
  index: number;
  bind: string;
  type: ?string;
  value: ?boolean;
  request: (action: {}) => void;
};

export default connect(ENDPOINT)((props: Props) => {
  const {
    id, index, val, request, type, caption
  } = props;

  const setValue = (event) => {
    request({
      type, id, index, value: event.detail.value
    });
  };

  return ([
    <div className="paper">
      <div>
        <Typography use="caption">{caption}</Typography>
      </div>
      <div width="100%">
        <Slider
          min={0}
          step={1}
          max={255}
          value={props[val] || 0}
          onInput={setValue}
        />
      </div>
    </div>
  ]);
});
