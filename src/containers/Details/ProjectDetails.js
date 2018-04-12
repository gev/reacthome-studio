
import React from 'react';
import { ToolbarIcon, } from 'rmwc/Toolbar';
import Card from './Card';
import SelectDaemon from './SelectDaemon';
import { LOCATION, DAEMON } from '../../constants';
import DetailSection from './DetailSection';
import AbstractDetails from './AbstractDetails';

export default class extends AbstractDetails {
  render() {
    const {
      project, id, daemon, location
    } = this.props;
    return (
      <div>
        <DetailSection
          title={DAEMON}
          action={
            <SelectDaemon
              id={id}
              value={daemon}
              handle={<ToolbarIcon use="more_horiz" />}
            />
          }
        >
          {
            daemon && <Card id={daemon} project={project} parent={id} field={DAEMON} />
          }
        </DetailSection>,
        <DetailSection title={LOCATION} action={<ToolbarIcon use="add" onClick={this.add(LOCATION, LOCATION)} />}>
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
