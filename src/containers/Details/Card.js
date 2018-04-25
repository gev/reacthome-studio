
import { post } from 'request';
import { createReadStream } from 'fs';
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import {
  Card,
  CardMedia,
  CardAction,
  CardActions,
  CardActionIcons,
  CardActionButtons
} from 'rmwc/Card';
import { TextField } from 'rmwc/TextField';
import { remove, set, attach } from '../../actions';
import { TITLE, CODE, IMAGE } from '../../constants';
import { height } from 'window-size';

type Props = {
  code: ?string,
  title: ?string,
  image: ?string,
  change: (payload: {}) => void,
  attachImage: (file: string) => void,
  removeField: () => void,
  details: () => void
};

class Container extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  attachImage = (accepted) => {
    if (accepted.length !== 1) return;
    this.props.attachImage(accepted[0].path);
  }

  render() {
    const {
      code, title, removeField, details, image
    } = this.props;
    return (
      <Card>
        <CardMedia sixteenByNine style={{ backgroundImage: `url(./tmp/assets/${image}` }}>
          <div className="dropzone-container">
            <Dropzone className="dropzone" accept="image/jpeg, image/png" onDrop={this.attachImage} multiple={false} />
          </div>
        </CardMedia>
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
            <CardAction icon use="remove" onClick={removeField} />
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
    change: (payload) => set(id, payload)
  }, dispatch)
)(Container);
