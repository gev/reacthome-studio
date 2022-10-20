
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
import { TabBar, Tab } from '@rmwc/tabs';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { remove, modify } from '../../../actions';
import { CODE, onTemperature, onHumidity, onDoppler, onIllumination, DI } from '../../../constants';
import Di from './CardDiBind';
import DeviceDoppler from '../../Device/DeviceDoppler';
import SelectScript from '../SelectScript';
import RGB from '../../RGB';
import Display from '../../Display';
import Autocomplete from '../../Filter';


const Row = ({
  title, value, magnitude, project, script, onSelect, onRemove
}) => (
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

class Container extends Component {
  state = { di: 0 }

  selectDi = ({ detail: { index } }) => {
    this.setState({ di: index });
  }

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
      id, code, project, daemon, temperature, removeField, humidity, illumination,
      button, led, hasDoppler, hasDisplay, dispaly
    } = this.props;
    const rgb = (n) => {
      const a = [];
      for (let i = 1; i <= n; i++) {
        a.push(<RGB id={id} index={i} daemon={daemon} key={`${id}/rgb/${i}`} />);
      }
      return a;
    };
    return (
      <Card>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        {hasDisplay && <Display daemon={daemon} id={id} />}
        {rgb(led)}
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
            <Row
              title="Humidity"
              value={humidity}
              magnitude="%"
              script={this.props.onHumidity}
              onSelect={this.select(onHumidity)}
              onRemove={this.remove(onHumidity)}
              project={project}
            />
            <Row
              title="Illumination"
              value={illumination}
              magnitude="lux"
              script={this.props.onIllumination}
              onSelect={this.select(onIllumination)}
              onRemove={this.remove(onIllumination)}
              project={project}
            />
          </tbody>
        </table>
        <TabBar
          activeTabIndex={this.state.di}
          onActivate={this.selectDi}
        >
          {
            new Array(button).fill(0).map((_, i) => (
              <Tab>{i + 1}</Tab>
            ))
          }
        </TabBar>
        <div className="paper">
          <Di id={`${id}/${DI}/${this.state.di + 1}`} project={project} />
        </div>
        {
          hasDoppler && (
            <div>
              <DeviceDoppler id={id} daemon={daemon} />
              <div className="paper">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <SelectScript
                          id={this.props.onDoppler}
                          project={project}
                          onSelect={this.select(onDoppler)}
                        />
                      </td>
                      <td>
                        {
                          this.props.onDoppler &&
                          <Typography use="caption" onClick={this.remove(onDoppler)}><strong> X </strong></Typography>
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
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
