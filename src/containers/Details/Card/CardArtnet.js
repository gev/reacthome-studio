
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardAction,
  CardActions,
  CardActionIcons,
  CardActionButtons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { ARTNET, TITLE, CODE } from '../../../constants';
import { remove, modify } from '../../../actions';
import Row from './ArtnetChannel';
import CardActionRemove from '../../../components/CardActionRemove';



class Container extends Component {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  changeInt = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: parseInt(value, 10) });
  }

  render() {
    const {
      id, title, code, host, port = 0x1936,
      net = 0, subnet = 0, universe = 0,
      rate = 40, size = 0,
      removeField
    } = this.props;
    const rows = [];
    for (let i = 0; i < Math.min(512, size); i += 1) {
      rows.push(<Row {...this.props} key={`${id}/${ARTNET}${i}`} index={i + 1} />);
    }
    return (
      <Card>
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <div className="paper">
          <TextField id="host" value={host} label="host" type="text" onChange={this.change} />
          <TextField id="port" value={port} label="port" type="number" onChange={this.changeInt} />
        </div>
        <div className="paper">
          <TextField id="net" value={net} label="net" type="number" onChange={this.changeInt} />
          <TextField id="subnet" value={subnet} label="subnet" type="number" onChange={this.changeInt} />
          <TextField id="universe" value={universe} label="universe" type="number" onChange={this.changeInt} />
        </div>
        <div className="paper">
          <TextField id="rate" value={rate} label="rate fps" type="number" onChange={this.changeInt} />
          <TextField id="size" value={size} label="channels" type="number" onChange={this.changeInt} />
        </div>
        <div style={{ maxWidth: '100%', maxHeight: 600, overflowY: 'auto' }}>
          <table>
            <tbody>
              {
                rows
              }
            </tbody>
          </table>
        </div>
        <CardActions>
          <CardActionIcons>
            <CardActionRemove remove={removeField} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, {
    project, parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
