
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBrands, getModels } from 'reacthome-ircodes';
import { Button } from '@rmwc/button';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { remove, modify, makeBind } from '../../../actions';
import { CODE, TITLE, TV } from '../../../constants';
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

class Container extends Component<Props> {
  state = {
    brands: [], models: []
  };
  async componentWillMount() {
    this.setState({ brands: await getBrands(TV) });
  }
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }
  selectIR = (bind) => {
    const { id } = this.props;
    this.props.makeBind(id, bind);
  }
  selectBrand = async (brand) => {
    this.setState({ models: await getModels(TV, brand) });
    this.props.change({ brand, model: null });
  }
  selectModel = (model) => {
    this.props.change({ model });
  }
  render() {
    const { brands, models } = this.state;
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
            options={brands}
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
