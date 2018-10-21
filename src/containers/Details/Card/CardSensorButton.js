
import React from 'react';
import { Typography } from '@rmwc/typography';
import { DI, onOff, onOn, onHold, DI_OFF, DI_ON, DI_HOLD } from '../../../constants';
import connect from './connect';
import SelectScript from '../SelectScript';

type Props = {
  site: string;
  index: number;
};

type ActionProps = {
  action: number;
  project: string;
  title: string;
  value: ?number;
  test: number;
  set: (payload: {}) => void;
};

const Action = (props: ActionProps) => {
  const {
    value, action, test, project, title, set
  } = props;
  const select = (id) => {
    set({ [action]: id });
  };
  const clear = () => {
    set({ [action]: null });
  };
  const script = props[action];
  return (
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
      <div>
        <SelectScript id={script} project={project} onSelect={select} />
      </div>
    </td>
  );
};

export default connect(DI)((props : Props) => (
  <tr>
    <td className="paper"><Typography use="caption">{props.index}</Typography></td>
    <Action {...props} action={onOff} test={DI_OFF} title="OFF" />
    <Action {...props} action={onOn} test={DI_ON} title="ON" />
    <Action {...props} action={onHold} test={DI_HOLD} title="HOLD" />
  </tr>
));
