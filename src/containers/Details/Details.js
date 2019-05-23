
import React from 'react';
import {
  SITE,
  PROJECT,
  DAEMON,
  SENSOR,
  DOPPLER,
  TV,
  SCENE,
  SCRIPT,
  TOUCH,
  DRIVER,
  DRIVER_TYPE_RS21,
  ARTNET
} from '../../constants';
import SiteDetails from './DetailsSite';
import ProjectDetails from './DetailsProject';
import DaemonDetails from './DetailsDaemon';
import FieldDetails from './DetailsField';
import SensorDetails from './DetailsSensor';
import TouchDetails from './DetailsTouch';
import DopplerDetails from './DetailsDoppler';
import TVDetails from './DetailsTV';
import SceneDetails from './DetailsScene';
import ScriptDetails from './DetailsScript';
import DriverDetails from './DetailsDriver';
import RS21Details from './DetailsRS21';

type Props = {
  type: ?string,
  field: ?string
};

export default (props: Props) => {
  const { field, type } = props;
  if (!field && type === PROJECT) return <ProjectDetails {...props} />;
  if (!field && type === SITE) return <SiteDetails {...props} />;
  if (!field && type === DAEMON) return <DaemonDetails {...props} />;
  if (!field && type === SCRIPT) return <ScriptDetails {...props} />;
  if (field === DRIVER) return <DriverDetails {...props} />;
  if (field === SENSOR) return <SensorDetails {...props} />;
  if (field === TOUCH) return <TouchDetails {...props} />;
  if (field === DRIVER_TYPE_RS21) return <RS21Details {...props} />;
  if (field === DOPPLER) return <DopplerDetails {...props} />;
  // if (field === TV) return <TVDetails {...props} />;
  if (field === SCENE) return <SceneDetails {...props} />;
  if (field) return <FieldDetails {...props} />;
  return null;
};
