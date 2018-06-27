
import React from 'react';
import { SITE, PROJECT, DAEMON, SENSOR, SCENE } from '../../constants';
import SiteDetails from './DetailsSite';
import ProjectDetails from './DetailsProject';
import DaemonDetails from './DetailsDaemon';
import FieldDetails from './DetailsField';
import SensorDetails from './DetailsSensor';
import SceneDetails from './DetailsScene';

type Props = {
  type: ?string,
  field: ?string
};

export default (props: Props) => {
  const { field, type } = props;
  if (!field && type === PROJECT) return <ProjectDetails {...props} />;
  if (!field && type === SITE) return <SiteDetails {...props} />;
  if (!field && type === DAEMON) return <DaemonDetails {...props} />;
  if (!field && type === SCENE) return <SceneDetails {...props} />;
  if (field === SENSOR) return <SensorDetails {...props} />;
  if (field) return <FieldDetails {...props} />;
  return null;
};
