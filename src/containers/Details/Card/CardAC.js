
import { codes } from 'reacthome-ircodes';
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { remove, modify, makeBind } from '../../../actions';
import { AC, CODE, TITLE } from '../../../constants';
import SelectChannel from './SelectChannel';
import SelectThermostat from './SelectThermostat';
import IR from './CardIRBind';
import { SelectMenu } from '../../../components';

type Props = {
  id: string;
  bind: ?string;
  code: ?string,
  title: ?string;
  project: string,
  change: (payload: {}) => void,
  removeField: () => void,
  makeBind: (id: string, bind: string) => void
};

const brands = codes[AC] || {};

class Container extends Component<Props> {
  state = { models: [] };
  componentWillMount() {
    const models = brands[this.props.brand] || {};
    this.setState({ models: Object.keys(models) });
  }
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  selectChannel = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }
  selectThermostat = (thermostat) => {
    this.props.change({ thermostat });
  }
  selectBrand = (brand) => {
    const models = brands[brand] || {};
    this.setState({ models: Object.keys(models) });
    this.props.change({ brand, model: null });
  }
  selectModel = (model) => {
    this.props.change({ model });
  }
  render() {
    const { models } = this.state;
    const {
      code, project, bind, title, removeField, id, brand, model
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
          <SelectMenu
            handle={<Button theme={brand ? 'primary' : 'text-hint-on-background'}>{brand || 'brand'}</Button>}
            onSelect={this.selectBrand}
            options={Object.keys(brands)}
          />
          <SelectMenu
            handle={<Button theme={model ? 'primary' : 'text-hint-on-background'}>{model || 'model'}</Button>}
            onSelect={this.selectModel}
            options={models}
          />
        </div>
        <div className="paper">
          <SelectThermostat id={id} root={project} />
        </div>
        <div className="paper">
          <SelectChannel id={bind} root={project} onSelect={this.selectChannel} />
        </div>
        {
          bind && (
            <table>
              <tbody>
                <IR id={bind} project={project} />
              </tbody>
            </table>
          )
        }
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
