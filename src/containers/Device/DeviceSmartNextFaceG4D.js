
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../actions';
import Slider from '../../components/Slider';
import styles from './DeviceSmartNextFaceG4D.css';

const scale = (a, min = 50, max = 240) => min + (max - min) * a / 255;

const rgb = ([r, g, b]) => `rgb(${scale(r)},${scale(g)},${scale(b)})`;


const compose = ([ar, ag, ab], am, [r, g, b], m) => {
  const s = am + m;
  const blend = (ac, c) => Math.floor((ac * am + c * m) / s);
  return [
    blend(ar, r),
    blend(ag, g),
    blend(ab, b),
  ];
};

const Circle = ({ color = [[0, 0, 0], [0, 0, 0]] }) => (
  <div
    className={styles.circle}
    style={{ background: `linear-gradient(to right, ${rgb(color[0])}, ${rgb(color[1])})` }}
  />
)

class Rect extends Component {
  state = { color: [0, 0, 0] };

  componentDidMount() {
    this.setState({ color: this.props.color });
  }

  componentWillReceiveProps({ color }) {
    this.setState({ color });
  }

  onClick = () => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(this.state.color, color => this.setState({ color }));
    }
  };

  render() {
    const { color } = this.state;
    const { className, style } = this.props;
    return (
      <div style={style} >
        <button
          className={className}
          style={{ backgroundColor: rgb(color) }}
          onClick={this.onClick}
        />
      </div>
    )
  }
}

const Button = ({ left = [0, 0, 0], right = [0, 0, 0], onSelect }) => {
  return (
    <div className={styles.button}>
      <Rect
        className={styles.rectV}
        color={left}
        onSelect={onSelect}
      />
      <Circle color={[left, right]} />
      <Rect
        className={styles.rectV}
        color={right}
        onSelect={onSelect}
      />
    </div>
  )
};

const Intensity = ({ top = [0, 0, 0], bottom = [0, 0, 0], onSelect }) => {
  return (
    <div className={styles.intensity}>
      <Rect
        className={styles.rectH1}
        color={top}
        onSelect={onSelect}
      />
      <Rect
        className={styles.rectH2}
        color={compose(top, 1, bottom, 1)}
        onSelect={onSelect}
      />
      <Rect
        className={styles.rectH3}
        color={bottom}
        onSelect={onSelect}
      />
    </div>
  )
}

const Power = ({ color = [0, 0, 0], onSelect }) => (
  <Rect
    className={styles.indicator}
    color={color}
    onSelect={onSelect}
  />
)

const Mode = ({ color = [], onSelect }) => (
  <div className={styles.mode}>
    {color.map((c = [0, 0, 0], i) => (
      <Rect
        key={`mode${i}`}
        className={styles.indicator}
        color={c}
        style={{ gridColumn: (i & 1) + 1, gridRow: (i >> 1) + 1 }}
        onSelect={onSelect}
      />
    ))}
  </div>
)

const Display = ({ leftTop = [0, 0, 0], leftBottom = [0, 0, 0], rightTop = [0, 0, 0], rightBottom = [0, 0, 0], onSelect }) => {
  const pixels = [];
  for (let i = 0; i < 14; i++) {
    const top = compose(leftTop, 13 - i, rightTop, i);
    const bottom = compose(leftBottom, 13 - i, rightBottom, i);
    for (let j = 0; j < 5; j++) {
      let className = styles.pixel;
      if (i === 0 && j !== 2) continue;
      if (i === 2) continue;
      if (i === 4 && j === 1) continue;
      if (i === 4 && j === 3) continue;
      if (i === 6) continue;
      if (i === 8 && j === 1) continue;
      if (i === 8 && j === 3) continue;
      if (i === 10) {
        if (j !== 4) continue;
        className = styles.pixel_;
      }
      if (i === 12 && j === 1) continue;
      if (i === 12 && j === 3) continue;
      pixels.push(
        <Rect
          key={`${i}.${j}`}
          className={className}
          color={compose(top, 4 - j, bottom, j)}
          style={{ gridColumn: i + 1, gridRow: j + 1 }}
          onSelect={onSelect}
        />
      );
    }
  }
  return (
    <div>
      <div className={styles.middle}>
        <Rect
          className={styles.rectH}
          color={leftTop}
          onSelect={onSelect}
        />
        <Rect
          className={styles.rectH}
          color={rightTop}
          onSelect={onSelect}
        />
      </div>
      <div className={styles.display}>
        {pixels}
      </div>
      <div className={styles.middle}>
        <Rect
          className={styles.rectH}
          color={leftBottom}
          onSelect={onSelect}
        />
        <Rect
          className={styles.rectH}
          color={rightBottom}
          onSelect={onSelect}
        />
      </div>
    </div>
  )
}


class Container extends Component {
  state = { color: [0, 0, 0], setColor: () => { } };

  onSelect = (color, setColor) => {
    this.setState({ color, setColor });
  }

  setR = ({ detail: { value: r } }) => {
    const { color: [_, g, b], setColor } = this.state;
    this.setState({ color: [r, g, b] });
    setColor(this.state.color);
  }

  setG = ({ detail: { value: g } }) => {
    const { color: [r, _, b], setColor } = this.state;
    this.setState({ color: [r, g, b] });
    setColor(this.state.color);
  }

  setB = ({ detail: { value: b } }) => {
    const { color: [r, g, _], setColor } = this.state;
    this.setState({ color: [r, g, b] });
    setColor(this.state.color);
  }


  render() {
    const { color: [r, g, b] } = this.state;
    return (
      <div className='paper'>
        <div className={styles.top}>
          <Button onSelect={this.onSelect} />
          <Button onSelect={this.onSelect} />
        </div>
        <div className={styles.middle}>
          <div className={styles.left}>
            <Intensity onSelect={this.onSelect} />
            <Power onSelect={this.onSelect} />
          </div>
          <Display onSelect={this.onSelect} />
          <div className={styles.right}>
            <Mode onSelect={this.onSelect} />
          </div>
        </div>
        <div className={styles.bottom}>
          <Button onSelect={this.onSelect} />
          <Button onSelect={this.onSelect} />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td width="33%"><div className="paper"><Slider label="r" value={r} min={0} max={255} step={1} discrete onInput={this.setR} color="red" /></div></td>
                <td width="33%"><div className="paper"><Slider label="g" value={g} min={0} max={255} step={1} discrete onInput={this.setG} color="green" /></div></td>
                <td width="33%"><div className="paper"><Slider label="b" value={b} min={0} max={255} step={1} discrete onInput={this.setB} color="blue" /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ pool }, { id, daemon }) => ({ ...pool[id], daemon }),
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload),
  }, dispatch)
)(Container);
