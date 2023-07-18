
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';
import { SimpleMenu, MenuItem } from '@rmwc/menu';
import { ACTION_ATS_MODE, ACTION_ERROR } from '../../constants';
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
  [MODE_N1_G]: { title: 'N1_G', value: MODE_N1_G, l: [line(1, 2, 1), gen(5, 6, 3, 4)], r: [7] },
  [MODE_N2]: { title: 'N2', value: MODE_N2, l: [line(1, 2, 1), line(3, 4, 2)], r: [7] },
  [MODE_N2_G]: { title: 'N2_G', value: MODE_N2_G, l: [line(1, 2, 1), line(3, 4, 2), gen(5, 6, 3, 4)], r: [7] },
};

class Container extends Component {
  render() {
    const { id, daemon, mode = 0x00, setMode, error = [0, 0, 0, 0], attempt = 0, resetError } = this.props;
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
              m.l.map((l, i) => [
                <tr key={`l${i}`}>
                  <td className="paper">{l.g ? 'G' : `N${i + 1}`}</td>
                  <td className="paper"><Di id={id} index={l.isU} title={`U / di ${l.isU}`} /></td>
                  <td className="paper"><Do id={id} daemon={daemon} index={l.on} title={`relay ${l.on}`} /></td>
                  <td className="paper"><Di id={id} index={l.isOn} title={`On/Off / di ${l.isOn}`} /></td>
                  {l.g ? (<td className="paper"><Do id={id} daemon={daemon} index={l.start} title={`start / relay ${l.start}`} /></td>) : <td />}
                </tr>,
                <tr key={`e${i}`}>
                  <td />
                  <td colSpan={4}>
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td className="paper" ><Typography use="caption">Line error</Typography>{` ${error[i + 1].toString(2)}`}</td>
                            {
                              l.g ? (
                                <td className="paper" ><Typography use="caption">Generator error</Typography>{` ${error[0]}`}</td>
                              ) : <td />
                            }
                            {
                              l.g ? (
                                <td className="paper" ><Typography use="caption">Attempt</Typography>{` ${attempt}`}</td>
                              ) : <td />
                            }
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              ])
            }
            {
              m.r.map((r, i) => (
                <tr key={`r${i}`}>
                  <td className="paper" />
                  <td className="paper"><Di id={id} index={r} title={`reset / di ${r}`} /></td>
                  <td className="paper" colSpan={3}><Button outlined onClick={resetError}>Reset Error</Button></td>
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
    }),
    resetError: () => request(daemon, {
      type: ACTION_ERROR, id
    })
  }, dispatch)
)(Container);
