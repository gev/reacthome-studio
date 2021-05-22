
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { codes } from 'reacthome-ircodes';
import { Button } from '@rmwc/button';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { remove, modify, makeBind, request } from '../../../actions';
import { ACTION_IR_CONFIG, CODE, TITLE, TV } from '../../../constants';
import SelectIR from './SelectIR';
import IR from './CardIRBind';
import { SelectMenu } from '../../../components';

type Props = {
  id: string;
  bind: ?string;
  code: ?string,
  title: ?string;
  project: string,
  brand: ?string,
  model: ?string,
  change: (payload: {}) => void,
  removeField: () => void,
  makeBind: (id: string, bind: string) => void
};

const brands = codes[TV] || {};

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
  selectIR = (dev, index) => {
    const { brand, model } = this.props;
    this.props.config(dev, index, brand, model);
  }
  selectBrand = (brand) => {
    const models = brands[brand] || {};
    this.setState({ models: Object.keys(models) });
    this.props.change({ brand, model: null });
  }
  selectModel = (model) => {
    const { bind = '', brand } = this.props;
    const [dev, , index] = bind.split('/');
    this.props.config(dev, index, brand, model);
  }
  render() {
    const { models } = this.state;
    const {
      code, project, bind, title, brand, model, removeField
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
          <SelectIR id={bind} root={project} onSelect={this.selectIR} />
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
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, {
    project, parent, id, field, multiple, daemon,
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => modify(id, payload),
    config: (dev, index, brand, model) => request(daemon, {
      type: ACTION_IR_CONFIG, id, dev, index, brand, model
    }),
    makeBind
  }, dispatch)
)(Container);
