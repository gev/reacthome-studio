
import React from 'react';
import { ToolbarIcon, } from 'rmwc/Toolbar';
import Card from './Card';
import { LOCATION, INTERFACE } from '../../constants';
import DetailSection from './DetailSection';
import AbstractDetails from './AbstractDetails';

export default class extends AbstractDetails {
  render() {
    const { project, id, location } = this.props;
    return (
      <div>
        <DetailSection title={LOCATION} action={<ToolbarIcon use="add" onClick={this.add(LOCATION, INTERFACE)} />}>
          {
            location && (
              location.map(i => (
                <Card key={i} id={i} project={project} parent={id} field={LOCATION} multiple />
              ))
            )
          }
        </DetailSection>
      </div>
    );
  }
}
