
import React from 'react';
import SelectTV from './SelectTV';
import SelectTVCommand from './SelectTVCommand';

type Props = {
  id: string;
  project: string;
  payload: ?{};
};

export default ({ id, project, payload }: Props) => (
  <div className="paper">
    <SelectTV action={id} payload={payload} project={project} />
    <SelectTVCommand action={id} payload={payload} project={project} />
  </div>
);
