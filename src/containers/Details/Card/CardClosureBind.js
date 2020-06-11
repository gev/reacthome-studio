
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Typography } from '@rmwc/typography';
import { modify } from '../../../actions';
import { onOpen, onStop, onClose, OPEN, STOP, CLOSE } from '../../../constants';
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
        <Typography use="caption" theme={(test ? value : !value) ? 'secondary' : 'text-hint-on-background'}>
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
    <Action {...props} action={onOpen} test={OPEN} title="Open" />
    <Action {...props} action={onStop} test={STOP} title="Stop" />
    <Action {...props} action={onClose} test={CLOSE} title="Close" />
  </tr>
);

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    modify: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
