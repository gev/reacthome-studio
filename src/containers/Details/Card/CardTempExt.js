
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
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { remove, modify } from '../../../actions';
import { CODE, onTemperature } from '../../../constants';
import SelectScript from '../SelectScript';
import Autocomplete from '../../Filter';

type Props = {
  code: ?string,
  project: string,
  temperature: ?number;
  onTemperature: ?string;
  change: (payload: {}) => void,
  removeField: () => void
};

type RowProps = {
  title: string;
  value: any;
  magnitude: ?string;
  project: string;
  script: ?string;
  onSelect: (id: string) => void;
  onRemove: () => void;
};

const Row = ({
  title, value, magnitude, project, script, onSelect, onRemove
}: RowProps) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      <Typography use="body">{value}{magnitude}</Typography>
    </td>
    <td>
      {
        script &&
          <Typography use="caption" onClick={onRemove}><strong> X </strong></Typography>
      }
    </td>
    <td>
      <SelectScript id={script} project={project} onSelect={onSelect} />
    </td>
  </tr>
);


class Container extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  select = (on) => (id) => {
    this.props.change({ [on]: id });
  }

  remove = (on) => () => {
    this.props.change({ [on]: null });
  }

  setDisplay = (display) => {
    this.props.change({ display });
  }

  render() {
    const {
      code, project, temperature, removeField, dispaly
    } = this.props;
    return (
      <Card>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <table style={{ textAlign: 'left' }}>
          <tbody>
            <Row
              title="Temperature"
              value={temperature}
              magnitude="°C"
              script={this.props.onTemperature}
              onSelect={this.select(onTemperature)}
              onRemove={this.remove(onTemperature)}
              project={project}
            />
          </tbody>
        </table>
        <div className="paper">
          <Typography>Display</Typography>
          <Autocomplete id={dispaly} root={project} onSelect={this.setDisplay} />
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
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, {
    project, parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
