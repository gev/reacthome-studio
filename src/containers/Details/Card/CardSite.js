
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Palette from 'react-palette';
import {
  Card,
  CardMedia,
  CardAction,
  CardActions,
  CardActionIcons,
  CardActionButtons
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import { remove, set, attach } from '../../../actions';
import { asset, TITLE, CODE, IMAGE } from '../../../constants';

type Props = {
  code: ?string,
  title: ?string,
  image: ?string,
  change: (payload: {}) => void,
  attachImage: (file: string) => void,
  setPalette: (file: string) => void,
  removeField: () => void,
  details: () => void
};

const ColorPair = ({ color, backgroundColor, children }) => (
  backgroundColor && (
    <div style={{ color, backgroundColor }}>
      {children}
    </div>
  )
);

class Container extends Component<Props> {
  componentDidMount() {
    const { image, setPalette } = this.props;
    if (!image || !image.includes('.JPG')) return;
    setPalette(asset(image));
  }

  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  attachImage = (accepted) => {
    const { attachImage } = this.props;
    if (accepted.length !== 1) return;
    const { path } = accepted[0];
    attachImage(path);
  }

  render() {
    const {
      code, title, removeField, details, image, setPalette
    } = this.props;
    const url = asset(image);
    return (
      <Card>
        <CardMedia square style={{ backgroundImage: `url(${url})` }}>
          <div className="dropzone-container">
            <Dropzone className="dropzone" accept="image/jpeg, image/png, image/svg+xml" onDrop={this.attachImage} multiple={false} />
          </div>
        </CardMedia>
        {
          image && (
            <Palette image={url}>
              {
                (palette) => {
                  const {
                    darkMuted, darkVibrant, lightMuted, lightVibrant, muted, vibrant
                  } = palette;
                  setPalette(palette);
                  return (
                    <div>
                      <ColorPair color="#fff" backgroundColor={darkMuted}>
                        darkMuted
                      </ColorPair>
                      <ColorPair color="#fff" backgroundColor={darkVibrant}>
                        darkVibrant
                      </ColorPair>
                      <ColorPair color="#333" backgroundColor={lightMuted}>
                        lightMuted
                      </ColorPair>
                      <ColorPair color="#333" backgroundColor={lightVibrant}>
                        lightVibrant
                      </ColorPair>
                      <ColorPair color="#fff" backgroundColor={muted}>
                        muted
                      </ColorPair>
                      <ColorPair color="#fff" backgroundColor={vibrant}>
                        vibrant
                      </ColorPair>
                    </div>
                  );
                }
              }
            </Palette>
          )
        }
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} placeholder="Untitled" fullwidth />
        </div>
        <div className="paper">
          <TextField id={CODE} value={code || ''} onChange={this.change} label={CODE} />
        </div>
        <CardActions>
          <CardActionButtons>
            <CardAction onClick={details}>Details</CardAction>
          </CardActionButtons>
          <CardActionIcons>
            <CardAction icon="remove" onClick={removeField} />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, {
    project, parent, id, field, multiple
  }) => bindActionCreators({
    removeField: () => (multiple ? remove(parent, field, id) : set(parent, { [field]: null })),
    details: () => push(`/project/${project}/${id}`),
    attachImage: (file) => attach(id, IMAGE, file),
    setPalette: (palette) => set(id, { palette }),
    change: (payload) => set(id, payload)
  }, dispatch)
)(Container);
