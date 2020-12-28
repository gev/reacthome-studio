
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

export default connect()((props: Props) => {
  const {
    id, index, val, request, type, caption, min = 0, max = 255
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
          min={min}
          step={1}
          max={max}
          value={props[val] || 0}
          onInput={setValue}
        />
      </div>
    </div>
  ]);
});
