
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

const n = 64;

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
    raw: [],
  }

  componentDidMount() {
    this.t = setInterval(this.tick, 200, 0);
  }

  componentWillReceiveProps() {
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.t);
  }

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
    // const { raw = [] } = this.props;
    const { data } = this.state;
    // const data = {
    //   labels: new Array(raw.length).fill(''),
    //   datasets: [
    //     {
    //       ...art('raw'),
    //       data: raw
    //     }
    //   ]
    // };
    return (
      <div className="paper">
        <div>
          <Line style={{ height: '200 px' }} data={data} options={optDoppler} />
        </div>
      </div>
    );
  }
}

export default connect(({ pool }, { id }) => pool[id] || {})(Doppler);
