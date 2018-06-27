
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Typography } from 'rmwc/Typography';
import { set } from '../../../actions';
import { DI_OFF, DI_ON, DI_HOLD } from '../../../constants';
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
  set: (id: string, payload: {}) => void;
};

const Action = (props: ActionProps) => {
  const {
    value, action, site, title, scene = []
  } = props;
  const select = (id) => {
    const s = [...scene];
    s[action] = id;
    props.set({ scene: s });
  };
  const clear = () => {
    const s = [...scene];
    delete s[action];
    props.set({ scene: s });
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

const Container = (props : Props) => (
  <tr>
    <Action {...props} action={DI_OFF} title="OFF" />
    <Action {...props} action={DI_ON} title="ON" />
    <Action {...props} action={DI_HOLD} title="HOLD" />
  </tr>
);

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    set: (payload) => set(id, payload)
  }, dispatch)
)(Container);
