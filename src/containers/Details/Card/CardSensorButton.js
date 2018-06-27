
import React from 'react';
import { Typography } from 'rmwc/Typography';
import { DI, DI_OFF, DI_ON, DI_HOLD } from '../../../constants';
import connect from './connect';
import SelectScene from './SelectScene';

type Props = {
  site: string;
  index: number;
};

type ActionProps = {
  action: number;
  site: string;
  title: string;
  value: ?number;
  scene: ?{};
  set: (payload: {}) => void;
};

const Action = ({
  value, action, site, title, set, scene = []
}: ActionProps) => {
  const select = (id) => {
    const s = [...scene];
    s[action] = id;
    set({ scene: s });
  };
  const clear = () => {
    const s = [...scene];
    delete s[action];
    set({ scene: s });
  };
  return (
    <td className="paper">
      <div>
        <Typography use="caption" theme={value === action ? 'secondary' : 'text-hint-on-background'}>
          {title}
        </Typography>
        {
          scene[action] &&
            <Typography use="caption" onClick={clear}><strong> X </strong></Typography>
        }
      </div>
      <div>
        <SelectScene id={scene[action]} root={site} onSelect={select} />
      </div>
    </td>
  );
};

export default connect(DI)((props : Props) => (
  <tr>
    <td className="paper"><Typography use="caption">{props.index}</Typography></td>
    <Action {...props} action={DI_OFF} title="OFF" />
    <Action {...props} action={DI_ON} title="ON" />
    <Action {...props} action={DI_HOLD} title="HOLD" />
  </tr>
));
