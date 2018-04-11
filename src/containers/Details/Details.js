
import React from 'react';
import { LOCATION, PROJECT } from '../../constants';
import LocationDetails from './LocationDetails';
import ProjectDetails from './ProjectDetails';
import FieldDetails from './FieldDetails';

type Props = {
  type: ?string,
  field: ?string
};

export default (props: Props) => {
  const { field, type } = props;
  if (!field && type === PROJECT) return <ProjectDetails {...props} />;
  if (!field && type === LOCATION) return <LocationDetails {...props} />;
  if (field) return <FieldDetails {...props} />;
  return null;
};
