
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setDeviceState } from '../../actions';

const optDoppler = {
  responsive: true,
  scales: {
    yAxes: [{
      display: true,
      ticks: {
        min: 0,
        max: 0xffff
      }
    }]
  }
};

const art = {
  label: 'Doppler',
  fill: false,
  lineTension: 0.1,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
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
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
};

const n = 100;

const initialData = {
  labels: new Array(n).fill(''),
  datasets: [{ ...art, data: new Array(n).fill(0) }]
};

type PropsType = {
  value: number
};

class Doppler extends Component<PropsType> {
  state = { data: initialData, min: 0xFFFF, max: 0 };

  componentWillReceiveProps() {
    const { value } = this.props;
    const { data, min, max } = this.state;
    const labels = [...data.labels.slice(1), new Date().toLocaleTimeString()];
    this.setState({
      data: {
        ...data,
        labels,
        datasets: [
          {
            ...art,
            data: [...data.datasets[0].data.slice(1), value]
          }
        ]
      }
    });
    if (value > max) {
      this.setState({ max: value });
    }
    if (value < min) {
      this.setState({ min: value });
    }
  }

  render() {
    const { value = 0 } = this.props;
    const { data, min, max } = this.state;
    return (
      <div />
      // <Card>
      //   <CardHeader
      //     title={`min: ${min}, max: ${max}, current: ${value}`}
      //   />
      //   <CardContent>
      //     <div className={classes.container}>
      //       <Line height={90} data={data} options={optDoppler} />
      //     </div>
      //   </CardContent>
      // </Card>
    );
  }
}

export default connect(
  props => props,
  (dispatch) => bindActionCreators({ setDeviceState }, dispatch)
)(Doppler);
