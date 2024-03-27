
import { Typography } from '@rmwc/typography';
import React from 'react';
import Slider from '../../components/Slider';
import connect from './connect';


export default connect()((props) => {
  const {
    id, index, val, request, action, caption, min = 0, max = 255
  } = props;

  const setValue = (event) => {
    request({
      type: action, id, index, value: event.detail.value
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
          discrete
        />
      </div>
    </div>
  ]);
});
