
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import { ACTION_ATS_MODE } from '../../constants';
import { request } from '../../actions';
import Di from './DeviceDiChannel';
import Do from './DeviceDoChannel';

const MODE_NONE = 0x00;
const MODE_N1_G = 0x11;
const MODE_N2 = 0x20;
const MODE_N2_G = 0x21;

const line = (isU, isOn, on) => ({ isU, isOn, on, g: false })
const gen = (isU, isOn, on, start) => ({ isU, isOn, on, start, g: true })

const DEF_MODE = { title: 'Mode', l: [], r: [] };

const modes = {
  [MODE_NONE]: { title: 'None', value: MODE_NONE, l: [], r: [] },
  [MODE_N1_G]: { title: 'N1_G', value: MODE_N1_G, l: [line(1, 2, 1), gen(3, 4, 2, 3)], r: [5] },
  [MODE_N2]: { title: 'N2', value: MODE_N2, l: [line(1, 2, 1), line(3, 4, 2)], r: [5] },
  [MODE_N2_G]: { title: 'N2_G', value: MODE_N2_G, l: [line(1, 2, 1), line(3, 4, 2), gen(5, 6, 3, 4)], r: [7] },
};

class Container extends Component {
  render() {
    const { id, daemon, mode = 0x00, setMode } = this.props;
    const m = modes[mode] || DEF_MODE;
    return (
      <div>
        <div className="paper">
          <SimpleMenu handle={<Button>{m.title}</Button>}>
            {
              Object.values(modes).map(({ title, value }, i) => (
                <MenuItem key={i} onClick={() => setMode(value)}>{title}</MenuItem>
              ))
            }
          </SimpleMenu>
        </div>
        <table>
          <tbody>
            {
              m.l.map((l, i) => (
                <tr key={`l${i}`}>
                  <td className="paper">{l.g ? 'G' : `N${i + 1}`}</td>
                  <td className="paper"><Di id={id} index={l.isU} title="U" /></td>
                  <td className="paper"><Do id={id} daemon={daemon} index={l.on} title="On" /></td>
                  <td className="paper"><Di id={id} index={l.isOn} title="On" /></td>
                  {l.g ? (<td className="paper"> <Do id={id} daemon={daemon} index={l.start} title="start" /></td>) : null}
                </tr>
              ))
            }
            {
              m.r.map((r, i) => (
                <tr key={`r${i}`}>
                  <td className="paper"></td>
                  <td className="paper"><Di id={id} index={r} title="reset" /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id, daemon }) => ({ ...pool[id], daemon }),
  (dispatch, { id, daemon }) => bindActionCreators({
    setMode: (value) => request(daemon, {
      type: ACTION_ATS_MODE, id, value
    })
  }, dispatch)
)(Container);
