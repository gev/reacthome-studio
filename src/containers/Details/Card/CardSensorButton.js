
import React from 'react';
import { Typography } from '@rmwc/typography';
import { DI, onOff, onOn, onHold, DI_OFF, DI_ON, DI_HOLD, onClick, DI_CLICK, onClick2, onClick3, DI_CLICK_2, DI_CLICK_3 } from '../../../constants';
import connect from './connect';
import SelectScript from '../SelectScript';

const Action = (props) => {
  const {
    value, action, test, project, title, modify
  } = props;
  const select = (id) => {
    modify({ [action]: id });
  };
  const clear = () => {
    modify({ [action]: null });
  };
  const script = props[action];
  return (
    <tr>
      <td className="paper">
        <div>
          <Typography use="caption" theme={value === test ? 'secondary' : 'text-hint-on-background'}>
            {title}
          </Typography>
          {
            script &&
              <Typography use="caption" onClick={clear}><strong> X </strong></Typography>
          }
        </div>
      </td>
      <td>
        <div>
          <SelectScript id={script} project={project} onSelect={select} />
        </div>
      </td>
    </tr>
  );
};

export default connect(DI)((props) => (
  <table>
    <tbody>
      <Action {...props} action={onOn} test={DI_ON} title="ON" />
      <Action {...props} action={onClick} test={DI_CLICK} title="CLICK" />
      <Action {...props} action={onClick2} test={DI_CLICK_2} title="CLICK2" />
      <Action {...props} action={onClick3} test={DI_CLICK_3} title="CLICK3" />
      <Action {...props} action={onHold} test={DI_HOLD} title="HOLD" />
      <Action {...props} action={onOff} test={DI_OFF} title="OFF" />
    </tbody>
  </table>
));
