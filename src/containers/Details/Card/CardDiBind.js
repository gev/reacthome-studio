
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Typography } from '@rmwc/typography';
import { modify } from '../../../actions';
import { onOff, onOn, onHold, DI_OFF, DI_ON, DI_HOLD, onClick, DI_CLICK } from '../../../constants';
import SelectScript from '../SelectScript';

type Props = {
  site: string;
  index: number;
};

type ActionProps = {
  action: string;
  project: string;
  title: string;
  value: ?number;
  test: number;
  modify: (id: string, payload: {}) => void;
};

const Action = (props: ActionProps) => {
  const {
    value, action, test, project, title
  } = props;
  const select = (id) => {
    props.modify({ [action]: id });
  };
  const clear = () => {
    props.modify({ [action]: null });
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

const Container = (props : Props) => (
  <tr>
    <Action {...props} action={onOn} test={DI_ON} title="ON" />
    <Action {...props} action={onClick} test={DI_CLICK} title="CLICK" />
    <Action {...props} action={onHold} test={DI_HOLD} title="HOLD" />
    <Action {...props} action={onOff} test={DI_OFF} title="OFF" />
  </tr>
);

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    modify: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
