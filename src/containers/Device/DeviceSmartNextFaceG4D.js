
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { v4 as uuid } from 'uuid';
import { modify } from '../../actions';

const scale = (a, min = 60, max = 245) => min + (max - min) * a / 255;

const rgb = ([r, g, b]) => `rgb(${scale(r)},${scale(g)},${scale(b)})`;

const compose = ([ar, ag, ab], am, [r, g, b], m) => {
  const s = am + m;
  return [
    (ar * am + r * m) / s,
    (ag * am + g * m) / s,
    (ab * am + b * m) / s
  ];
};

const Button = ({ x, y, width = 4, height = 8, r = 12, gap = 2, left = [0, 0, 0], right = [0, 0, 0] }) => {
  const id = uuid();
  return (
    <g>
      <defs>
        <linearGradient id={id} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0%" stopColor={rgb(left)} />
          <stop offset="100%" stopColor={rgb(right)} />
        </linearGradient>
      </defs>
      <rect
        width={width}
        height={height}
        x={x - r - width - gap}
        y={y - height / 2}
        fill={rgb(left)}
      />
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={`url(#${id})`}
      />
      <rect
        width={width}
        height={height}
        x={x + r + gap}
        y={y - height / 2}
        fill={rgb(right)}
      />
    </g>
  )
};

const Intensity = ({ x, y, width = 8, height = 4, gap = 2, top = [0, 0, 0], bottom = [0, 0, 0] }) => {
  return (
    <g>
      <rect
        width={width}
        height={height}
        x={x - width / 2}
        y={y - height * 1.5 - gap}
        fill={rgb(top)}
      />
      <rect
        width={(width + height) / 2}
        height={height}
        x={x - (width + height) / 4}
        y={y - height / 2}
        fill={rgb(compose(top, 1, bottom, 1))}
      />
      <rect
        width={height}
        height={height}
        x={x - height / 2}
        y={y + height / 2 + gap}
        fill={rgb(bottom)}
      />
    </g>
  )
}

const Power = ({ x, y, width = 8, height = 8, color = [0, 0, 0] }) => (
  <rect
    width={width}
    height={height}
    x={x - width / 2}
    y={y - height / 2}
    fill={rgb(color)}
  />
)

const Mode = ({ x, y, width = 8, height = 8, gap = 2, color = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]] }) => (
  <g>
    <rect
      width={width}
      height={height}
      x={x - width - gap / 2}
      y={y - height * 1.5 - gap}
      fill={rgb(color[0])}
    />
    <rect
      width={width}
      height={height}
      x={x + gap / 2}
      y={y - height * 1.5 - gap}
      fill={rgb(color[1])}
    />
    <rect
      width={width}
      height={height}
      x={x - width - gap / 2}
      y={y - height / 2}
      fill={rgb(color[2])}
    />
    <rect
      width={width}
      height={height}
      x={x + gap / 2}
      y={y - height / 2}
      fill={rgb(color[3])}
    />
    <rect
      width={width}
      height={height}
      x={x - width - gap / 2}
      y={y + height / 2 + gap}
      fill={rgb(color[4])}
    />
    <rect
      width={width}
      height={height}
      x={x + gap / 2}
      y={y + height / 2 + gap}
      fill={rgb(color[5])}
    />
  </g>
)

const Display = ({ x, y, width = 4, height = 4, gap = 1, leftTop = [0, 0, 0], leftBottom = [0, 0, 0], rightTop = [0, 0, 0], rightBottom = [0, 0, 0] }) => {
  const pixels = [];
  for (let i = 0; i < 14; i++) {
    const top = compose(leftTop, 13 - i, rightTop, i);
    const bottom = compose(leftBottom, 13 - i, rightBottom, i);
    for (let j = 0; j < 5; j++) {
      let offset = 0;
      if (i === 0 && j !== 2) continue;
      if (i === 2) continue;
      if (i === 4 && j === 1) continue;
      if (i === 4 && j === 3) continue;
      if (i === 6) continue;
      if (i === 8 && j === 1) continue;
      if (i === 8 && j === 3) continue;
      if (i === 10) {
        if (j !== 4) continue;
        offset = height / 2;
      }
      if (i === 12 && j === 1) continue;
      if (i === 12 && j === 3) continue;
      pixels.push(
        <rect
          key={`${i}.${j}`}
          width={width}
          height={height}
          x={x + (i - 7) * (width + gap) + gap / 2}
          y={y + (j - 2.5) * (height + gap) + gap / 2 + offset}
          fill={rgb(compose(top, 4 - j, bottom, j))}
        />
      );
    }
  }
  return (
    <g>
      <rect
        width={width * 2}
        height={height}
        x={x - 8 * (width + gap)}
        y={y - 3.5 * (height + gap)}
        fill={rgb(leftTop)}
      />
      <rect
        width={width * 2}
        height={height}
        x={x + 7 * (width + gap) + 2 * gap}
        y={y - 3.5 * (height + gap)}
        fill={rgb(rightTop)}
      />
      <rect
        width={width * 2}
        height={height}
        x={x - 8 * (width + gap)}
        y={y + 2.5 * (height + gap) + gap}
        fill={rgb(leftBottom)}
      />
      <rect
        width={width * 2}
        height={height}
        x={x + 7 * (width + gap) + 2 * gap}
        y={y + 2.5 * (height + gap) + gap}
        fill={rgb(rightBottom)}
      />
      {pixels}
    </g>
  )
}


class Container extends Component {
  render() {
    return (
      <div className='paper'>
        <svg width="100%" viewBox="0 0 142 116">
          <Button x={30} y={16} left={[255, 0, 0]} right={[0, 0, 255]} />
          <Button x={112} y={16} left={[0, 0, 255]} right={[255, 0, 0]} />
          <Button x={30} y={100} left={[255, 0, 0]} right={[0, 0, 255]} />
          <Button x={112} y={100} left={[0, 0, 255]} right={[255, 0, 0]} />
          <Intensity x={4} y={52} top={[255, 0, 0]} bottom={[0, 255, 0]} />
          <Power x={4} y={70} color={[255, 128, 0]} />
          <Mode x={133} y={58} color={[[255, 128, 0], [128, 255, 0], [0, 128, 255], [255, 0, 128], [0, 255, 128], [128, 0, 255]]} />
          <Display x={68} y={58} leftTop={[255, 255, 0]} leftBottom={[255, 0, 0]} rightTop={[0, 255, 0]} rightBottom={[0, 0, 255]} />
        </svg>
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
