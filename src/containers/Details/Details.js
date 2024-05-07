
import React from 'react';
import {
  DAEMON,
  DOPPLER,
  DRIVER,
  DRIVER_TYPE_RS21,
  ELECTRICITY_METER,
  PROJECT,
  SCENE,
  SCRIPT,
  SENSOR,
  SITE,
  TOUCH
} from '../../constants';
import DaemonDetails from './DetailsDaemon';
import DopplerDetails from './DetailsDoppler';
import DriverDetails from './DetailsDriver';
import ElectricityMeterDetails from './DetailsElectricityMeter';
import FieldDetails from './DetailsField';
import ProjectDetails from './DetailsProject';
import RS21Details from './DetailsRS21';
import SceneDetails from './DetailsScene';
import ScriptDetails from './DetailsScript';
import SensorDetails from './DetailsSensor';
import SiteDetails from './DetailsSite';
import TouchDetails from './DetailsTouch';

export default (props) => {
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
  if (field === ELECTRICITY_METER) return <ElectricityMeterDetails {...props} />;
  // if (field === TV) return <TVDetails {...props} />;
  if (field === SCENE) return <SceneDetails {...props} />;
  if (field) return <FieldDetails {...props} />;
  return null;
};
