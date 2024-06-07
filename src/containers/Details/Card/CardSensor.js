
import {
  Card,
  CardActionIcons,
  CardActions
} from '@rmwc/card';
import { Tab, TabBar } from '@rmwc/tabs';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { modify, remove } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import { CODE, DI, onCO2, onDoppler, onHumidity, onIllumination, onTemperature } from '../../../constants';
import DeviceDoppler from '../../Device/DeviceDoppler';
import Display from '../../Display';
import Autocomplete from '../../Filter';
import RGB from '../../RGB';
import SelectScript from '../SelectScript';
import Di from './CardDiBind';


const Row = ({
  title, value, magnitude, project, script, onSelect, onRemove
}) => (
  <tr>
    <td className="paper">
      <Typography use="body">{title}</Typography>
    </td>
    <td className="paper">
      <Typography use="body">{typeof value === 'number' && value.toFixed(2)}{magnitude}</Typography>
    </td>
    <td>
      {
        script &&
        <Typography use="caption" onClick={onRemove}><strong> X </strong></Typography>
      }
    </td>
    <td className='paper'>
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
      id, code, project, daemon,
      temperature, humidity, illumination, co2,
      removeField,
      button, led, hasCO2, hasIllumination, hasHumidity, hasTemperature, hasDoppler, hasDisplay, display
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
            {
              hasTemperature && <Row
                title="Temperature"
                value={temperature}
                magnitude="°C"
                script={this.props.onTemperature}
                onSelect={this.select(onTemperature)}
                onRemove={this.remove(onTemperature)}
                project={project}
              />
            }
            {
              hasHumidity &&
              <Row
                title="Humidity"
                value={humidity}
                magnitude="%"
                script={this.props.onHumidity}
                onSelect={this.select(onHumidity)}
                onRemove={this.remove(onHumidity)}
                project={project}
              />
            }
            {
              hasCO2 &&
              <Row
                title="CO2"
                value={co2}
                magnitude="ppm"
                script={this.props.onIllumination}
                onSelect={this.select(onCO2)}
                onRemove={this.remove(onCO2)}
                project={project}
              />
            }
            {
              hasIllumination &&
              <Row
                title="Illumination"
                value={illumination}
                magnitude="lux"
                script={this.props.onIllumination}
                onSelect={this.select(onIllumination)}
                onRemove={this.remove(onIllumination)}
                project={project}
              />
            }
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
          <Autocomplete id={display} root={project} onSelect={this.setDisplay} />
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
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
