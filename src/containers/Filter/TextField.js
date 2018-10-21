
import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@rmwc/textfield';

type Props = {
  id: string,
  code: ?string,
  title: ?string,
  text: ?string,
  onInput: (event: {}) => void
}

const Container = ({
  id, code, title, text, onInput
}: Props) => (
  <TextField fullwidth onInput={onInput} placeholder={code || title || id} value={text || ''} />
);

export default connect(({ pool }, { id }) => pool[id] || {})(Container);
