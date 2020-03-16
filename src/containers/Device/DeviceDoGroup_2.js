
import React from 'react';
import { Checkbox } from '@rmwc/checkbox';
import { TextField } from '@rmwc/textfield';
import { GROUP, ACTION_GROUP } from '../../constants';
import Do from './DeviceDoChannel_2';
import connect from './connect';

type Props = {
  id: string;
  index: number;
  value: ?boolean;
  request: (action: {}) => void;
};

export default connect(GROUP)((props: Props) => {
  const {
    id, index, daemon, request, value, delay
  } = props;

  const i = (index - 1) * 2;

  const setValue = (event) => {
    request({
      type: ACTION_GROUP, id, index, value: event.target.checked
    });
  };

  const setDelay = (event) => {
    request({
      type: ACTION_GROUP, id, index, delay: parseInt(event.target.value, 10)
    });
  };

  return (
    <table>
      <tbody>
        <tr>
          <td colSpan={2}>
            <div>
              <Checkbox checked={value} label="group" onChange={setValue} />
              <TextField value={delay} label="delay" type="number" onInput={setDelay} />
            </div>
          </td>
        </tr>
        <tr>
          <td className="paper"><Do id={id} daemon={daemon} index={i + 1} /></td>
          <td className="paper"><Do id={id} daemon={daemon} index={i + 2} /></td>
        </tr>
      </tbody>
    </table>
  );
});
