
import React from 'react';
import { AppManager, Apps } from '../App';

export default ({ name }: { name: ?string }) => (
  <AppManager name={name}>
    <Apps />
  </AppManager>
);
