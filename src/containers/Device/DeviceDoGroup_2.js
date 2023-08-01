
import React from 'react';
import { Button } from '@rmwc/button';
import { Checkbox } from '@rmwc/checkbox';
import { TextField } from '@rmwc/textfield';
import { GROUP, ACTION_GROUP, OPEN, CLOSE, STOP, OPEN_CLOSE, CLOSE_OPEN, ACTION_SET, ACTION_OPEN, ACTION_CLOSE, ACTION_STOP, ACTION_DO } from '../../constants';
import Do from './DeviceDoChannel_2';
import connect from './connect';


export default connect(GROUP)((props) => {
  const {
    id, index, daemon, request, enabled, delay, type = OPEN_CLOSE,
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

  const setOpenClose = () => {
    request({ type: ACTION_SET, id: `${id}/${GROUP}/${index}`, payload: { type: OPEN_CLOSE } });
  };

  const setCloseOpen = () => {
    request({ type: ACTION_SET, id: `${id}/${GROUP}/${index}`, payload: { type: CLOSE_OPEN } });
  };

  const open = () => {
    request({
      type: ACTION_DO, id, index, value: ACTION_OPEN
    });
  };

  const close = () => {
    request({
      type: ACTION_DO, id, index, value: ACTION_CLOSE
    });
  };

  const stop = () => {
    request({
      type: ACTION_DO, id, index, value: ACTION_STOP
    });
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>
              <div>
                <Checkbox checked={enabled} label="group" onChange={setEnabled} />
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
      <table style={{ textAlign: 'center' }}>
        <tbody>
          {
            (type === OPEN_CLOSE) ? (
              <tr>
                <td><Button onClick={open}>{OPEN}</Button></td>
                <td><Button onClick={setCloseOpen}>{'< >'}</Button></td>
                <td><Button onClick={close}>{CLOSE}</Button></td>
              </tr>
            ) : (
              <tr>
                <td><Button onClick={close}>{CLOSE}</Button></td>
                <td><Button onClick={setOpenClose}>{'< >'}</Button></td>
                <td><Button onClick={open}>{OPEN}</Button></td>
              </tr>
            )
          }
          <tr>
            <td />
            <td><Button onClick={stop}>{STOP}</Button></td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
});
