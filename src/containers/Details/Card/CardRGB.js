
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { remove, modify, makeBind } from '../../../actions';
import { CODE, TITLE, BIND } from '../../../constants';
import DeviceDo from './DeviceDo';
import SelectDo from './SelectDo';
import Do from './CardDoBind';

type Props = {
  id: string;
  r: ?string;
  g: ?string;
  b: ?string;
  code: ?string,
  title: ?string;
  project: string,
  daemon: string,
  change: (payload: {}) => void,
  removeField: () => void,
  makeBind: (id: string, bind: string) => void
};

class Container extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  select = (channel) => (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind, channel, BIND);
  }
  render() {
    const {
      code, project, daemon, r, g, b, title, removeField
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <table>
            <tbody>
              <tr>
                <td><Typography>R</Typography></td>
                <td><SelectDo id={r} root={project} onSelect={this.select('r')} /></td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {
                    r && (
                      <table>
                        <tbody>
                          <Do id={r} project={project} />
                        </tbody>
                      </table>
                    )
                  }
                  {
                    r && (
                      <DeviceDo id={r} daemon={daemon} />
                    )
                  }
                </td>
              </tr>
              <tr>
                <td><Typography>G</Typography></td>
                <td><SelectDo id={g} root={project} onSelect={this.select('g')} /></td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {
                    g && (
                      <table>
                        <tbody>
                          <Do id={g} project={project} />
                        </tbody>
                      </table>
                    )
                  }
                  {
                    g && (
                      <DeviceDo id={g} daemon={daemon} />
                    )
                  }
                </td>
              </tr>
              <tr>
                <td><Typography>B</Typography></td>
                <td><SelectDo id={b} root={project} onSelect={this.select('b')} /></td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {
                    b && (
                      <table>
                        <tbody>
                          <Do id={b} project={project} />
                        </tbody>
                      </table>
                    )
                  }
                  {
                    b && (
                      <DeviceDo id={b} daemon={daemon} />
                    )
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CardActions>
          <CardActionIcons>
            <CardAction icon="remove" onClick={removeField} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id }) => ({ ...pool[id], get: (subj) => pool[subj] || {} }),
  (dispatch, {
    project, parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => modify(id, payload),
    makeBind
  }, dispatch)
)(Container);
