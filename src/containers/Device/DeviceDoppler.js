
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Line } from 'react-chartjs-2';
import { Typography } from '@rmwc/typography';
import { Slider } from '@rmwc/slider';
import { request } from '../../actions';
import { ACTION_DOPPLER } from '../../constants';

const optDoppler = {
  responsive: true,
  animation: false,
  scales: {
    yAxes: [{
      display: true,
      // type: 'logarithmic',
      ticks: {
        min: 0,
        max: 300
      }
    }],
    xAxes: [{
      display: false
    }]
  }
};

const art = (value = 0) => ({
  label: value,
  fill: false,
  lineTension: 0,
  borderDashOffset: 0.0,
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointHoverBackgroundColor: 'rgba(75,192,192,1)'
});

const n = 200;

const initialData = {
  labels: new Array(n).fill(''),
  datasets: [{ ...art(0), data: new Array(n).fill(0) }]
};

type PropsType = {
  value: number;
  gain: number;
  setGain: (value: number) => void
};

class Doppler extends Component<PropsType> {
  state = {
    data: initialData,
    max: 0
  }

  componentDidMount() {
    this.t = setInterval(this.tick, 100);
  }

  componentWillUnmount() {
    clearInterval(this.t);
  }

  // componentWillReceiveProps() {
  //   this.tick();
  // }

  // shouldComponentUpdate({ value }) {
  //   return value !== this.props.value;
  // }

  tick = () => {
    const { value } = this.props;
    const { max, data } = this.state;
    const a = [...data.datasets[0].data.slice(1), value];
    this.setState({
      max: Math.max(...a),
      data: {
        ...data,
        datasets: [
          {
            ...art(`Value ${value} / ${max}`),
            data: a
          }
        ]
      }
    });
  }

  setGain = (event) => {
    this.props.setGain(event.detail.value);
  };

  render() {
    const { gain = 0 } = this.props;
    const { data } = this.state;

    return (
      <div className="paper">
        <div>
          <Line style={{ height: '200 px' }} data={data} options={optDoppler} />
        </div>
        <div>
          <Slider value={gain} min={0} max={255} step={1} onInput={this.setGain} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography use="content">Gain {gain + 1}</Typography>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { daemon, id }) => bindActionCreators({
    setGain: (gain) => request(daemon, { type: ACTION_DOPPLER, gain, id })
  }, dispatch)
)(Doppler);
