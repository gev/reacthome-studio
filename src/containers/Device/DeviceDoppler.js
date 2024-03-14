
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

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

const colors = ["Purple", "Blue", "Green", "Orange", "Red"];

const art = (value = 0, i = 0) => {
  const color = colors[i];
  return ({
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
    backgroundColor: color,
    borderColor: color,
    pointBorderColor: color,
    pointHoverBackgroundColor: color
  })
};

const n = 64;

const tmp = new Array(n).fill(0);

const initialData = (k = 1) => {
  const datasets = new Array(k);
  for (let i = 0; i < k; i++) {
    datasets[i] = {
      ...art(0, i),
      data: tmp
    };
  }
  return ({
    labels: new Array(n).fill(''),
    datasets
  });
};
export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: initialData(props.n),
      max: new Array(props.n).fill(0),
    };
  }

  componentDidMount() {
    this.t = setInterval(this.tick, 300);
  }

  componentWillReceiveProps() {
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.t);
  }

  tick = () => {
    const { n } = this.props;
    const { value = new Array(n).fill(0) } = this.props;
    const { data, max } = this.state;
    const a = data.datasets.map((v, i) => [...v.data.slice(1), value[i]]);
    this.setState({
      max: a.map(v => Math.max(...v)),
      data: {
        ...data,
        datasets: a.map((v, i) => ({
          ...art(`${i + 1}: ${value[i]} / ${max[i]}`, i),
          data: v,
        }))
      },
    });
  }


  render() {
    const { data } = this.state;
    return (
      <div>
        <Line style={{ height: '200 px' }} data={data} options={optDoppler} />
      </div>
    )
  }
}
