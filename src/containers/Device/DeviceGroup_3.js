
import React from 'react';
import { Checkbox } from '@rmwc/checkbox';
import { TextField } from '@rmwc/textfield';
import { GROUP, ACTION_GROUP } from '../../constants';
import connect from './connect';

export default connect(GROUP)((props) => {
  const {
    id, index, request, enabled, delay, 
  } = props;

  const i = (index - 1) * 2;

  const setEnabled = (event) => {
    request({
      type: ACTION_GROUP, id, index, enabled: event.target.checked
    });
  };

  const setDelay = (event) => {
    request({
      type: ACTION_GROUP, id, index, delay: parseInt(event.target.value, 10)
    });
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>
              <div>
                <Checkbox checked={enabled} label={String(index)} onChange={setEnabled} />
                <TextField value={delay} label="delay" type="number" onInput={setDelay} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
