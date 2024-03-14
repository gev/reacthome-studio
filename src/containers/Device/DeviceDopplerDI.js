
import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import DeviceDi from './DeviceDi';

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

const colors = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

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

const initialData = {
  labels: new Array(n).fill(''),
  datasets: [{ ...art(0), data: tmp }]
};
class Doppler extends Component {
  state = {
    index: 0,
    data: initialData,
    raw: [],
    max: []
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
    const { data, max } = this.state;
    const a = value.map((v, i) => [...(data.datasets[i] || { data: tmp }).data.slice(1), v]);
    this.setState({
      max: a.map(Math.max),
      data: {
        ...data,
        datasets: value.map((v, i) => ({
          ...art(`Value ${v || 0} / ${max[i] || 0}`, i),
          data: a[i],
        }))
      },
    });
    // const a = [...data.datasets[0].data.slice(1), value[0]];
    // this.setState({
    //   max: Math.max(...a),
    //   data: {
    //     ...data,
    //     datasets: [
    //       {
    //         ...art(`Value ${value[0]} / ${max}`),
    //         data: a
    //       }
    //     ]
    //   }
    // });
  }


  select = ({ detail: { index } }) => {
    this.setState({ index });
  };

  render() {
    const { index, data } = this.state;
    const { di, doppler } = this.props;
    return (
      <div className="paper">
        <TabBar
          activeTabIndex={index}
          onActivate={this.select}
        >
          <Tab>Inputs</Tab>
          <Tab>Doppler</Tab>
        </TabBar>
        {
          index === 0 && (
            <DeviceDi {...this.props} n={di} />
          )
        }
        {
          index === 1 && (
            <div>
              <Line style={{ height: '200 px' }} data={data} options={optDoppler} />
            </div>
          )
        }
      </div>
    );
  }
}

export default connect(({ pool }, { id }) => pool[id] || {})(Doppler);
