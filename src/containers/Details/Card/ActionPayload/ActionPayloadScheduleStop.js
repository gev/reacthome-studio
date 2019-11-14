
import React from 'react';
import SelectSchedule from './SelectSchedule';

type Props = {
  id: string;
  project: string;
  payload: ?{};
};

export default ({ id, project, payload }: Props) => (
  <div className="paper">
    <SelectSchedule action={id} payload={payload} project={project} />
  </div>
);
