
import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@rmwc/textfield';

const Container = ({id, code, title, text, onInput}) => (
  <TextField fullwidth onInput={onInput} placeholder={id ? code || title || id: ''} value={text || ''} />
);

export default connect(({ pool }, { id }) => id ? pool[id] || {} : {})(Container);
