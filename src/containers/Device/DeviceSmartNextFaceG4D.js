
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../actions';
import style from './DeviceSmartNextFaceG4D.css';

const scale = (a, min = 50, max = 240) => min + (max - min) * a / 255;

const rgb = ([r, g, b]) => `rgb(${scale(r)},${scale(g)},${scale(b)})`;

const compose = ([ar, ag, ab], am, [r, g, b], m) => {
  const s = am + m;
  return [
    (ar * am + r * m) / s,
    (ag * am + g * m) / s,
    (ab * am + b * m) / s,
  ];
};

const Circle = ({ color = [[0, 0, 0], [0, 0, 0]] }) => (
  <div
    className={style.circle}
    style={{ background: `linear-gradient(to right, ${rgb(color[0])}, ${rgb(color[1])})` }}
  />
)

const Rect = ({ className, color = [0, 0, 0], style }) => (
  <button
    className={className}
    style={{ backgroundColor: rgb(color), ...style }}
  />
)

const Button = ({ left = [0, 0, 0], right = [0, 0, 0] }) => {
  return (
    <div className={style.button}>
      <Rect
        className={style.rectV}
        color={left}
      />
      <Circle color={[left, right]} />
      <Rect
        className={style.rectV}
        color={right}
      />
    </div>
  )
};

const Intensity = ({ top = [0, 0, 0], bottom = [0, 0, 0] }) => {
  return (
    <div className={style.intensity}>
      <Rect
        className={style.rectH1}
        color={top}
      />
      <Rect
        className={style.rectH2}
        color={compose(top, 1, bottom, 1)}
      />
      <Rect
        className={style.rectH3}
        color={bottom}
      />
    </div>
  )
}

const Power = ({ color = [0, 0, 0] }) => (
  <Rect
    className={style.indicator}
    color={color}
  />
)

const Mode = ({ color = [] }) => (
  <div className={style.mode}>
    {color.map((c = [0, 0, 0], i) => (
      <Rect
        key={`mode${i}`}
        className={style.indicator}
        color={c}
        style={{ gridColumn: (i & 1) + 1, gridRow: (i >> 1) + 1 }}
      />
    ))}
  </div>
)

const Display = ({ leftTop = [0, 0, 0], leftBottom = [0, 0, 0], rightTop = [0, 0, 0], rightBottom = [0, 0, 0] }) => {
  const pixels = [];
  for (let i = 0; i < 14; i++) {
    const top = compose(leftTop, 13 - i, rightTop, i);
    const bottom = compose(leftBottom, 13 - i, rightBottom, i);
    for (let j = 0; j < 5; j++) {
      let className = style.pixel;
      if (i === 0 && j !== 2) continue;
      if (i === 2) continue;
      if (i === 4 && j === 1) continue;
      if (i === 4 && j === 3) continue;
      if (i === 6) continue;
      if (i === 8 && j === 1) continue;
      if (i === 8 && j === 3) continue;
      if (i === 10) {
        if (j !== 4) continue;
        className = style.pixel_;
      }
      if (i === 12 && j === 1) continue;
      if (i === 12 && j === 3) continue;
      pixels.push(
        <Rect
          key={`${i}.${j}`}
          className={className}
          color={compose(top, 4 - j, bottom, j)}
          style={{ gridColumn: i + 1, gridRow: j + 1 }}
        />
      );
    }
  }
  return (
    <div>
      <div className={style.middle}>
        <Rect
          className={style.rectH}
          color={leftTop}
        />
        <Rect
          className={style.rectH}
          color={rightTop}
        />
      </div>
      <div className={style.display}>
        {pixels}
      </div>
      <div className={style.middle}>
        <Rect
          className={style.rectH}
          color={leftBottom}
        />
        <Rect
          className={style.rectH}
          color={rightBottom}
        />
      </div>
    </div>
  )
}


class Container extends Component {
  render() {
    return (
      <div className='paper'>
        <div className={style.top}>
          <Button left={[255, 0, 0]} right={[0, 0, 255]} />
          <Button left={[0, 0, 255]} right={[255, 0, 0]} />
        </div>
        <div className={style.middle}>
          <div className={style.left}>
            <Intensity top={[255, 0, 0]} bottom={[0, 255, 0]} />
            <Power color={[255, 128, 0]} />
          </div>
          <Display leftTop={[255, 255, 0]} leftBottom={[255, 0, 0]} rightTop={[0, 255, 0]} rightBottom={[0, 0, 255]} />
          <div className={style.right}>
            <Mode color={[[255, 128, 0], [128, 255, 0], [0, 128, 255], [255, 0, 128], [0, 255, 128], [128, 0, 255]]} />
          </div>
        </div>
        <div className={style.bottom}>
          <Button left={[255, 0, 0]} right={[0, 0, 255]} />
          <Button left={[0, 0, 255]} right={[255, 0, 0]} />
        </div>
      </div >
    )
  }
}

export default connect(
  ({ pool }, { id, daemon }) => ({ ...pool[id], daemon }),
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload),
  }, dispatch)
)(Container);
