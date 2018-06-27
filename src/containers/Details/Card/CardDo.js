
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from 'rmwc/Card';
import { TextField } from 'rmwc/TextField';
import { remove, set } from '../../../actions';
import { CODE } from '../../../constants';
import Do from './CardDoBind';
import SelectDo from './SelectDo';

type Props = {
  id: string;
  bind: ?string;
  code: ?string,
  project: string,
  change: (payload: {}) => void,
  removeField: () => void,
  get: (subj: string) => {},
  set: (subj: string, payload: {}) => void
};

class Container extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  select = (bind) => {
    const { id } = this.props;
    this.props.set(this.props.get(id).bind, { bind: null });
    this.props.set(this.props.get(bind).bind, { bind: null });
    this.props.set(id, { bind });
    this.props.set(bind, { bind: id });
  }
  render() {
    const {
      code, project, bind, removeField
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <table>
          <tbody>
            <tr>
              <td className="paper"><SelectDo id={bind} root={project} onSelect={this.select} /></td>
              {
                bind && <td className="paper"><Do id={bind} /></td>
              }
            </tr>
          </tbody>
        </table>
        <CardActions>
          <CardActionIcons>
            <CardAction icon use="remove" onClick={removeField} />
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
    removeField: () => (multiple ? remove(parent, field, id) : set(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => set(id, payload),
    set: (subj, payload) => set(subj, payload)
  }, dispatch)
)(Container);
