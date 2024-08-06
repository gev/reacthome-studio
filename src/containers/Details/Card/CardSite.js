
import {
  Card,
  CardAction,
  CardActionButtons,
  CardActionIcons,
  CardActions,
  CardMedia
} from '@rmwc/card';
import { TextField } from '@rmwc/textfield';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { attach, modify, remove } from '../../../actions';
import CardActionRemove from '../../../components/CardActionRemove';
import { CODE, IMAGE, TITLE } from '../../../constants';
import { asset } from '../../../fs';


const ColorPair = ({ color, backgroundColor, children }) => (
  backgroundColor ? (
    <div style={{ color, backgroundColor }}>
      {children}
    </div>
  ) : null
);

class Container extends Component {
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
      code, title, removeField, details, image,
      palette: {
        darkMuted, darkVibrant, lightMuted, lightVibrant, muted, vibrant
      } = {}
    } = this.props;
    const url = asset(image).replace(/\\/g, '/');
    return (
      <Card>
        <CardMedia square style={{ backgroundImage: `url("${url}")` }}>
          <div className="dropzone-container">
            <Dropzone className="dropzone" accept="image/jpeg, image/png, image/svg+xml" onDrop={this.attachImage} multiple={false} />
          </div>
        </CardMedia>
        {
          // image && (
          //   <Palette image={url}>
          //     {
          //       (palette) => {
          //         const {
          //           darkMuted, darkVibrant, lightMuted, lightVibrant, muted, vibrant
          //         } = palette;
          //         // setPalette(palette);
          //         return (
          //           <div>
          //             <ColorPair color="#fff" backgroundColor={darkMuted}>
          //               darkMuted
          //             </ColorPair>
          //             <ColorPair color="#fff" backgroundColor={darkVibrant}>
          //               darkVibrant
          //             </ColorPair>
          //             <ColorPair color="#333" backgroundColor={lightMuted}>
          //               lightMuted
          //             </ColorPair>
          //             <ColorPair color="#333" backgroundColor={lightVibrant}>
          //               lightVibrant
          //             </ColorPair>
          //             <ColorPair color="#fff" backgroundColor={muted}>
          //               muted
          //             </ColorPair>
          //             <ColorPair color="#fff" backgroundColor={vibrant}>
          //               vibrant
          //             </ColorPair>
          //           </div>
          //         );
          //       }
          //     }
          //   </Palette>
          // )
        }
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
            <CardActionRemove remove={removeField} />
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
    removeField: () => (multiple ? remove(parent, field, id) : modify(parent, { [field]: null })),
    attachImage: (file) => attach(id, IMAGE, file),
    details: () => push(`/project/${project}/${id}`),
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
