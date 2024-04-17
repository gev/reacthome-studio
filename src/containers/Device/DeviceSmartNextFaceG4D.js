
import { Checkbox } from '@rmwc/checkbox';
import { Switch } from '@rmwc/switch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify, request } from '../../actions';
import Slider from '../../components/Slider';
import { ACTION_BLINK, ACTION_DIMMER, ACTION_DO, ACTION_GRADIENT, ACTION_IMAGE, ACTION_RGB_DIM, ACTION_VIBRO } from '../../constants';
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
  return r === 0 && g === 0 && b === 0 ? `rgb(0 0 0)` : `rgb(${r1} ${g1} ${b1})`;
}

const iterate = (callback) => {
  let index = 19;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 14; j++) {
      if (j === 0 && i !== 2) continue;
      if (j === 2) continue;
      if (j === 4 && i === 1) continue;
      if (j === 4 && i === 3) continue;
      if (j === 6) continue;
      if (j === 8 && i === 1) continue;
      if (j === 8 && i === 3) continue;
      if (j === 10 && i !== 4) continue;
      if (j === 12 && i === 1) continue;
      if (j === 12 && i === 3) continue;
      callback(index, i, j);
      index++;
    }
  }
}

const channel = (type, id, index) => `${id}/${type}/${index}`;

const Circle = connect(
  ({ pool }, { id, index }) =>
  ({
    colors: [
      pool[channel('rgb', id, index)],
      pool[channel('rgb', id, index + 1)],
    ]
  })
)
  (({ colors = [] }) => (
    <div
      className={styles.circle}
      style={{ background: `linear-gradient(to right, ${rgb(colors[0])}, ${rgb(colors[1])})` }}
    />
  ))


class Rect extends Component {
  render() {
    const { color, className, style, onDoubleClick, onClick } = this.props;
    return (
      <div style={style} >
        <button
          className={className}
          style={{ backgroundColor: rgb(color) }}
          onDoubleClick={onDoubleClick}
          onClick={onClick}
        />
      </div>
    )
  }
}

const Pixel = connect(
  ({ pool }, { id, index }) => pool[channel('rgb', id, index)] || {},
  (dispatch, { daemon, id, index }) => bindActionCreators({
    setColor: (value) => request(daemon, {
      type: ACTION_RGB_DIM, value, id, index
    }),
  }, dispatch)
)(class extends Component {

  onDoubleClick = () => {
    const { index, onToggle } = this.props;
    onToggle(index);
  }
  render() {
    const { index, className, style, r, g, b, setColor, onSelect, image = [], blink = [] } = this.props;
    const color = { r, g, b };
    const i = (index - 1) >> 3;
    const j = (index - 1) % 8;
    const image_mask = (image[i] >> j) & 1;
    const blink_mask = (blink[i] >> j) & 1;
    const classNames = [className];
    if (!image_mask) {
      classNames.push(styles.off);
    }
    if (blink_mask) {
      classNames.push('blink');
    }
    return (
      <Rect
        index={index}
        className={classNames.join(' ')}
        style={style}
        color={color}
        onClick={() => onSelect(index, color, setColor)}
        onDoubleClick={this.onDoubleClick}
      />
    )
  }
})


const Gradient = connect(
  ({ pool }, { id, index }) => pool[channel('gradient', id, index)] || {},
  (dispatch, { daemon, id, index }) => bindActionCreators({
    setColor: (value) => request(daemon, {
      type: ACTION_GRADIENT,
      id, index,
      value
    })
  }, dispatch)
)(class extends Component {
  render() {
    const { style, r, g, b, onSelect, setColor } = this.props;
    const color = { r, g, b };
    return (
      <Rect
        className={styles.rectH}
        style={style}
        color={color}
        onClick={() => onSelect(0, color, setColor)}
      />
    )
  }
})

const Button = ({ id, daemon, index, image, blink, onSelect, onToggle }) => {
  return (
    <div className={styles.button}>
      <Pixel
        id={id}
        daemon={daemon}
        index={2 * index - 1}
        className={styles.rectV}
        image={image}
        blink={blink}
        onSelect={onSelect}
        onToggle={onToggle}
      />
      <Circle id={id} index={2 * index - 1} />
      <Pixel
        id={id}
        daemon={daemon}
        index={2 * index}
        className={styles.rectV}
        image={image}
        blink={blink}
        onSelect={onSelect}
        onToggle={onToggle}
      />
    </div>
  )
};

const Intensity = ({ id, daemon, image, blink, onSelect, onToggle }) => {
  return (
    <div className={styles.intensity}>
      <Pixel
        id={id}
        daemon={daemon}
        index={9}
        className={styles.rectH1}
        image={image}
        blink={blink}
        onSelect={onSelect}
        onToggle={onToggle}
      />
      <Pixel
        id={id}
        daemon={daemon}
        index={10}
        className={styles.rectH2}
        image={image}
        blink={blink}
        onSelect={onSelect}
        onToggle={onToggle}
      />
      <Pixel
        id={id}
        daemon={daemon}
        index={11}
        className={styles.rectH3}
        image={image}
        blink={blink}
        onSelect={onSelect}
        onToggle={onToggle}
      />
    </div>
  )
}

const Power = ({ id, daemon, image, blink, onSelect, onToggle }) => (
  <Pixel
    id={id}
    daemon={daemon}
    index={12}
    className={styles.indicator}
    image={image}
    blink={blink}
    onSelect={onSelect}
    onToggle={onToggle}
  />
)

const Mode = ({ id, daemon, image, blink, onSelect, onToggle }) => {
  const pixels = [];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 2; j++) {
      pixels.push(
        <Pixel
          id={id}
          daemon={daemon}
          index={2 * i + j + 13}
          key={`${id}/mode${i}.${j}`}
          className={styles.indicator}
          style={{ gridRow: i + 1, gridColumn: j + 1 }}
          image={image}
          blink={blink}
          onSelect={onSelect}
          onToggle={onToggle}
        />
      );
    }
  return (
    <div className={styles.mode}>
      {pixels}
    </div>
  );
}

const Display = ({ id, daemon, image, blink, onSelect, onToggle }) => {
  const pixels = [];
  iterate((index, i, j) => {
    pixels.push(
      <Pixel
        id={id}
        daemon={daemon}
        index={index}
        key={`${id}/display/${index}`}
        className={i === 4 && j === 10 ? styles.pixel_ : styles.pixel}
        style={{ gridRow: i + 1, gridColumn: j + 1 }}
        image={image}
        blink={blink}
        onSelect={onSelect}
        onToggle={onToggle}
      />
    );

  })
  return (
    <div className={styles.display}>
      {pixels}
    </div>
  )
}



class Container extends Component {
  state = { index: 0, color: { r: 0, g: 0, b: 0 }, setColor: () => { }, blink: false, setBlink: () => { } };

  onSelect = (index, color, setColor) => {
    if (index !== 0) {
      const i = (index - 1) >> 3;
      const j = (index - 1) % 8;
      const { blink = [] } = this.props;
      const mask = (blink[i] >> j) & 1;
      this.setState({ blink: mask });
    }
    this.setState({ index, color, setColor });
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

  setVibro = ({ detail: { value } }) => {
    const { id, daemon, request } = this.props;
    request(daemon, {
      type: ACTION_VIBRO, value: value * 25, id,
    })
  }

  setBrightness = ({ detail: { value } }) => {
    const { id, daemon, request } = this.props;
    request(daemon, {
      type: ACTION_DIMMER, value, id,
    })
  }

  onSwitch = () => {
    const { id, daemon, state = true, request } = this.props;
    console.log(daemon, id, state ? 0 : 1)
    request(daemon, {
      type: ACTION_DO, id, value: state ? 0 : 1
    })
  }

  onToggle = (index) => {
    const { daemon, id, image = [], request } = this.props;
    const value = [...image];
    const i = (index - 1) >> 3;
    const j = (index - 1) % 8;
    const mask = (value[i] >> j) & 1;
    if (mask) {
      value[i] &= ~(1 << j);
    } else {
      value[i] |= 1 << j;
    }
    request(daemon, {
      type: ACTION_IMAGE, value, id
    })

    console.log(index)
  }

  blink = () => {
    const { index } = this.state;
    if (index === 0) return;
    const { daemon, id, blink = [], request } = this.props;
    const value = [...blink];
    const i = (index - 1) >> 3;
    const j = (index - 1) % 8;
    const mask = (value[i] >> j) & 1;
    if (mask) {
      value[i] &= ~(1 << j);
      this.setState({ blink: false });
    } else {
      value[i] |= 1 << j;
      this.setState({ blink: true });
    }
    request(daemon, {
      type: ACTION_BLINK, value, id
    })

  }


  render() {
    const { id, daemon, brightness = 128, vibro = 100, state = true, image, blink } = this.props;
    const { color: { r, g, b } } = this.state;
    return (
      <div className='paper'>
        <div className={styles.top}>
          <Button id={id} daemon={daemon} index={1} image={image} blink={blink} onSelect={this.onSelect} onToggle={this.onToggle} />
          <Button id={id} daemon={daemon} index={2} image={image} blink={blink} onSelect={this.onSelect} onToggle={this.onToggle} />
        </div>
        <div className={styles.middle}>
          <div className={styles.left}>
            <Intensity id={id} daemon={daemon} image={image} blink={blink} onSelect={this.onSelect} onToggle={this.onToggle} />
            <Power id={id} daemon={daemon} image={image} blink={blink} onSelect={this.onSelect} onToggle={this.onToggle} />
          </div>
          <div>
            <div className={styles.middle}>
              <Gradient id={id} daemon={daemon} index={1} onSelect={this.onSelect} />
              <Gradient id={id} daemon={daemon} index={2} onSelect={this.onSelect} />
            </div>
            <Display id={id} daemon={daemon} image={image} blink={blink} onSelect={this.onSelect} onToggle={this.onToggle} />
            <div className={styles.middle}>
              <Gradient id={id} daemon={daemon} index={3} onSelect={this.onSelect} />
              <Gradient id={id} daemon={daemon} index={4} onSelect={this.onSelect} />
            </div>
          </div>
          <div className={styles.right}>
            <Mode id={id} daemon={daemon} image={image} blink={blink} onSelect={this.onSelect} onToggle={this.onToggle} />
          </div>
        </div>
        <div className={styles.bottom}>
          <Button id={id} daemon={daemon} index={3} image={image} blink={blink} onSelect={this.onSelect} onToggle={this.onToggle} />
          <Button id={id} daemon={daemon} index={4} image={image} blink={blink} onSelect={this.onSelect} onToggle={this.onToggle} />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td width="30%"><div className="paper"><Slider label="r" value={r} min={0} max={255} step={1} discrete onInput={this.setR} /></div></td>
                <td width="30%"><div className="paper"><Slider label="g" value={g} min={0} max={255} step={1} discrete onInput={this.setG} /></div></td>
                <td width="30%"><div className="paper"><Slider label="b" value={b} min={0} max={255} step={1} discrete onInput={this.setB} /></div></td>
                <td width="10%"><div className="paper"><Checkbox label="blink" checked={!!this.state.blink} onChange={this.blink} /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td width="30%"><div className="paper"><Slider label="vibro" value={vibro / 25} min={0} max={10} step={1} discrete onInput={this.setVibro} /></div></td>
                <td width="50%"><div className="paper"><Slider label="brightness" value={brightness} min={0} max={255} step={1} discrete onInput={this.setBrightness} /></div></td>
                <td width="10%"><div className="paper"><Switch checked={!!state} onChange={this.onSwitch} /></div></td>
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
    request: (daemon, payload) => request(daemon, payload),
  }, dispatch)
)(Container);
