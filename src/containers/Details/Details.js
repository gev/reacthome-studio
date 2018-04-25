
import React from 'react';
import { SITE, PROJECT, DAEMON } from '../../constants';
import SiteDetails from './SiteDetails';
import ProjectDetails from './ProjectDetails';
import DaemonDetails from './DaemonDetails';
import FieldDetails from './FieldDetails';

type Props = {
  type: ?string,
  field: ?string
};

export default (props: Props) => {
  const { field, type } = props;
  if (!field && type === PROJECT) return <ProjectDetails {...props} />;
  if (!field && type === SITE) return <SiteDetails {...props} />;
  if (!field && type === DAEMON) return <DaemonDetails {...props} />;
  if (field) return <FieldDetails {...props} />;
  return null;
};
