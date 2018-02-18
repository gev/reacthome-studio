
import React from 'react';
import { AppManager, Apps } from '../containers';

export default ({ name }: { name: ?string }) => (
  <AppManager name={name}>
    <Apps />
  </AppManager>
);
