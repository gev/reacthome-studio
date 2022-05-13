/* eslint-disable no-bitwise */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Checkbox } from '@rmwc/checkbox';
import { TextField } from '@rmwc/textfield';
import { Slider } from '@rmwc/slider';
import { Typography } from '@rmwc/typography';
import { modify, request } from '../../../actions';
import { TITLE, ACTION_MULTIROOM_ZONE } from '../../../constants';

const amp = connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    set: (source) => modify(id, { source }),
  }, dispatch)
);

const Title = amp(({ source = [], index, set }) => (
  <TextField
    label={TITLE}
    value={source[index] || ''}
    onChange={(event) => {
      const s = [...source];
      s[index] = event.target.value;
      set(s);
    }}
  />
));

const zone = connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, daemon }) => bindActionCreators({
    set: (source) => request(daemon, {
      type: ACTION_MULTIROOM_ZONE, id, source,
    })
  }, dispatch)
);

const Row = zone(({
  id, source = [], index, set
}) => {
  const [dev] = id.split('/');
  const s = source[index] || {};
  const config = (active, volume) => {
    const a = [...source];
    a[index] = { active, volume };
    set(a);
  };
  return [
    <tr key="1">
      <td style={{ width: '30px' }}>
        <div>
          <Typography>{index}</Typography>
        </div>
      </td>
      <td style={{ width: '30px' }}>
        <div>
          <Checkbox
            checked={s.active}
            onChange={() => {
              config(!s.active, s.volume);
            }}
          />
        </div>
      </td>
      <td>
        <div>
          {
            s.active && (
              <Title id={dev} index={index} />
            )
          }
        </div>
      </td>
    </tr>,
    <tr key="2">
      <td />
      <td />
      <td>
        <div>
          {
          s.active && (
            <Slider
              value={s.volume}
              min={0}
              max={255}
              discrete
              onInput={(event) => {
                config(s.active, event.detail.value);
              }}
            />
          )
        }
        </div>
      </td>
    </tr>,
  ];
});

export default ({ id, daemon }) => (
  <div className="paper">
    <table>
      <tbody>
        <Row daemon={daemon} id={id} index={0} />
        <Row daemon={daemon} id={id} index={1} />
        <Row daemon={daemon} id={id} index={2} />
        <Row daemon={daemon} id={id} index={3} />
        <Row daemon={daemon} id={id} index={4} />
        <Row daemon={daemon} id={id} index={5} />
        <Row daemon={daemon} id={id} index={6} />
        <Row daemon={daemon} id={id} index={7} />
        <Row daemon={daemon} id={id} index={8} />
      </tbody>
    </table>
  </div>
);
