
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify, request } from '../../actions';
import Slider from '../../components/Slider';
import { ACTION_RGB_DIM } from '../../constants';
import styles from './DeviceSmartNextFaceG4D.css';

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l;
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

const rgb = ({ r = 0, g = 0, b = 0 } = {}) => {
  const [h, s, l] = rgbToHsl(r, g, b);
  const [r1, g1, b1] = hslToRgb(h, s, l * 0.6 + 0.35);
  return r === 0 && g === 0 && b === 0 ? 'black' : `rgb(${r1} ${g1} ${b1})`;
}


const compose = (ac, am = 1, bc, bm = 1) => {
  const s = am + bm;
  const blend = (a = 0, b = 0) => Math.floor((a * am + b * bm) / s);
  return ({
    r: blend(ac.r, bc.r),
    g: blend(ac.g, bc.g),
    b: blend(ac.b, cc.b),
  });
};

const channel = (id, index) => `${id}/rgb/${index}`;

const Circle = connect(
  ({ pool }, { id, index }) =>
  ({
    colors: [
      pool[channel(id, index)],
      pool[channel(id, index + 1)],
    ]
  })
)
  (({ colors = [] }) => (
    <div
      className={styles.circle}
      style={{ background: `linear-gradient(to right, ${rgb(colors[0])}, ${rgb(colors[1])})` }}
    />
  ))

const Rect = connect(
  ({ pool }, { id, index }) => pool[channel(id, index)] || {},
  (dispatch, { daemon, id, index }) => bindActionCreators({
    set: (value) => request(daemon, {
      type: ACTION_RGB_DIM, value, id, index
    })
  }, dispatch)
)(class extends Component {
  onClick = () => {
    const { r, g, b, onSelect, set } = this.props;
    if (onSelect) {
      onSelect({ r, g, b }, color => set(color));
    }
  };

  render() {
    const { className, style } = this.props;
    return (
      <div style={style} >
        <button
          className={className}
          style={{ backgroundColor: rgb(this.props) }}
          onClick={this.onClick}
        />
      </div>
    )
  }
})

const Button = ({ id, daemon, index, onSelect }) => {
  return (
    <div className={styles.button}>
      <Rect
        id={id}
        daemon={daemon}
        index={2 * index - 1}
        className={styles.rectV}
        onSelect={onSelect}
      />
      <Circle id={id} index={2 * index - 1} />
      <Rect
        id={id}
        daemon={daemon}
        index={2 * index}
        className={styles.rectV}
        onSelect={onSelect}
      />
    </div>
  )
};

const Intensity = ({ id, daemon, onSelect }) => {
  return (
    <div className={styles.intensity}>
      <Rect
        id={id}
        daemon={daemon}
        index={9}
        className={styles.rectH1}
        onSelect={onSelect}
      />
      <Rect
        id={id}
        daemon={daemon}
        index={10}
        className={styles.rectH2}
        onSelect={onSelect}
      />
      <Rect
        id={id}
        daemon={daemon}
        index={11}
        className={styles.rectH3}
        onSelect={onSelect}
      />
    </div>
  )
}

const Power = ({ id, daemon, onSelect }) => (
  <Rect
    id={id}
    daemon={daemon}
    index={12}
    className={styles.indicator}
    onSelect={onSelect}
  />
)

const Mode = ({ id, daemon, onSelect }) => {
  const pixels = [];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 2; j++) {
      pixels.push(
        <Rect
          id={id}
          daemon={daemon}
          index={2 * i + j + 13}
          key={`${id}/mode${i}.${j}`}
          className={styles.indicator}
          style={{ gridRow: i + 1, gridColumn: j + 1 }}
          onSelect={onSelect}
        />
      );
    }
  return (
    <div className={styles.mode}>
      {pixels}
    </div>
  );
}

const Display = ({ id, daemon, onSelect }) => {
  const pixels = [];
  let index = 19;
  for (let i = 0; i < 5; i++) {
    // const top = compose(leftTop, 13 - i, rightTop, i);
    // const bottom = compose(leftBottom, 13 - i, rightBottom, i);
    for (let j = 0; j < 14; j++) {
      let className = styles.pixel;
      if (j === 0 && i !== 2) continue;
      if (j === 2) continue;
      if (j === 4 && i === 1) continue;
      if (j === 4 && i === 3) continue;
      if (j === 6) continue;
      if (j === 8 && i === 1) continue;
      if (j === 8 && i === 3) continue;
      if (j === 10) {
        if (i !== 4) continue;
        className = styles.pixel_;
      }
      if (j === 12 && i === 1) continue;
      if (j === 12 && i === 3) continue;
      pixels.push(
        <Rect
          id={id}
          daemon={daemon}
          index={index}
          key={`${id}/display/${index}`}
          className={className}
          style={{ gridRow: i + 1, gridColumn: j + 1 }}
          onSelect={onSelect}
        />
      );
      index++;
    }
  }
  return (
    <div>
      {/* <div className={styles.middle}>
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
      </div> */}
      <div className={styles.display}>
        {pixels}
      </div>
      {/* <div className={styles.middle}>
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
      </div> */}
    </div>
  )
}


class Container extends Component {
  state = { color: { r: 0, g: 0, b: 0 }, setColor: () => { } };

  onSelect = (color, setColor) => {
    this.setState({ color, setColor });
  }

  setR = ({ detail: { value: r } }) => {
    const { color: { _, g, b }, setColor } = this.state;
    this.setState({ color: { r, g, b } });
    setColor(this.state.color);
  }

  setG = ({ detail: { value: g } }) => {
    const { color: { r, _, b }, setColor } = this.state;
    this.setState({ color: { r, g, b } });
    setColor(this.state.color);
  }

  setB = ({ detail: { value: b } }) => {
    const { color: { r, g, _ }, setColor } = this.state;
    this.setState({ color: { r, g, b } });
    setColor(this.state.color);
  }


  render() {
    const { id, daemon } = this.props;
    const { color: { r, g, b } } = this.state;
    return (
      <div className='paper'>
        <div className={styles.top}>
          <Button id={id} daemon={daemon} index={1} onSelect={this.onSelect} />
          <Button id={id} daemon={daemon} index={2} onSelect={this.onSelect} />
        </div>
        <div className={styles.middle}>
          <div className={styles.left}>
            <Intensity id={id} daemon={daemon} onSelect={this.onSelect} />
            <Power id={id} daemon={daemon} onSelect={this.onSelect} />
          </div>
          <Display id={id} daemon={daemon} onSelect={this.onSelect} />
          <div className={styles.right}>
            <Mode id={id} daemon={daemon} onSelect={this.onSelect} />
          </div>
        </div>
        <div className={styles.bottom}>
          <Button id={id} daemon={daemon} index={3} onSelect={this.onSelect} />
          <Button id={id} daemon={daemon} index={4} onSelect={this.onSelect} />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td width="33%"><div className="paper"><Slider label="r" value={r} min={0} max={255} step={1} discrete onInput={this.setR} /></div></td>
                <td width="33%"><div className="paper"><Slider label="g" value={g} min={0} max={255} step={1} discrete onInput={this.setG} /></div></td>
                <td width="33%"><div className="paper"><Slider label="b" value={b} min={0} max={255} step={1} discrete onInput={this.setB} /></div></td>
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
