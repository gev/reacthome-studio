
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Slider } from '@rmwc/slider';

import { request } from '../actions';
import { ACTION_IMAGE } from '../constants';
import TextField from '@rmwc/textfield';

const Segment = ({ image, index, width, height, onChange }) => {
  const setMask = 1 << index;
  const clearMask = 0xff ^ setMask;
  const value = image & setMask;
  const backgroundColor = value ? 'black' : 'transparent';
  const change = () => {
    if (value) {
      onChange(image & clearMask);
    } else {
      onChange(image | setMask);
    }
  };
  return (
    <div style={{
      backgroundColor, width, height, border:'solid 1px #aaa'
    }} onClick={change}/>
  );
};

const HSegment = props => <Segment {...props} height="10px" width="40px" />;
const VSegment = props => <Segment {...props} height="40px" width="10px" />;

const Image = ({ image, onChange }) => (
  <table style={{
    width: '60px', height: '110', display: 'inline', margin: '8px'
  }}>
    <tbody>
      <tr >
        <td />
        <td><HSegment image={image} index={0} onChange={onChange} /></td>
        <td />
      </tr>
      <tr heigth={40}>
        <td><VSegment image={image} index={1} onChange={onChange} /></td>
        <td />
        <td><VSegment image={image} index={2} onChange={onChange} /></td>
      </tr>
      <tr heigth={10}>
        <td />
        <td><HSegment image={image} index={3} onChange={onChange} /></td>
        <td />
      </tr>
      <tr heigth={40}>
        <td><VSegment image={image} index={4} onChange={onChange} /></td>
        <td />
        <td><VSegment image={image} index={5} onChange={onChange} /></td>
      </tr>
      <tr heigth={10}>
        <td />
        <td><HSegment image={image} index={6} onChange={onChange} /></td>
        <td />
      </tr>
      <tr><td colSpan="3">{image.toString(2).padStart(7, '0')}</td></tr>
    </tbody>
  </table>
);

class Container extends Component {

  render() {
    const { level, image: [c2, c1] = [0, 0], text, setImage } = this.props;
    const change1 = (v) => setImage([c2, v], level);
    const change2 = (v) => setImage([v, c1], level);
    const setLevel = (event) => setImage([c2, c1], event.detail.value);
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <div className="paper">
                <Image image={c2} onChange={change2} />
                <Image image={c1} onChange={change1} />
              </div>
            </td>
            <td>  
              <TextField defaultValue={text} onInput={(event) => setImage(event.target.value, level)} />
            </td>
          </tr>
          <tr>
            <td>
              <div className="paper">
                <Slider value={level} min={0} max={255} step={1} onInput={setLevel} discrete />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id, daemon }) => bindActionCreators({
    setImage: (value, level) => request(daemon, {
      id, type: ACTION_IMAGE, value, level,
    })
  }, dispatch)
)(Container);
