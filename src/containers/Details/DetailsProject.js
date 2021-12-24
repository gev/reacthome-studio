
import React from 'react';
import { ToolbarIcon, } from '@rmwc/toolbar';
import Card from './Card';
import SelectDaemon from './SelectDaemon';
import { PARENT, SITE, DAEMON } from '../../constants';
import DetailSection from './DetailSection';
import AbstractDetails from './DetailsAbstract';

export default class extends AbstractDetails {
  render() {
    const {
      project, id, daemon, site
    } = this.props;
    return (
      <div>
        <DetailSection
          title={DAEMON}
          action={
            <SelectDaemon
              id={id}
              value={daemon}
              handle={<ToolbarIcon theme="text-primary-on-light" icon="more_horiz" />}
            />
          }
        >
          {
            daemon && (
              <Card id={daemon} project={project} parent={id} field={DAEMON} daemon={daemon} />
            )
          }
        </DetailSection>
        <DetailSection title={SITE} action={<ToolbarIcon theme="text-primary-on-light" icon="add" onClick={this.create(SITE, SITE, PARENT)} />}>
          {
            Array.isArray(site) && (
              site.map(i => (
                <Card
                  key={i}
                  id={i}
                  project={project}
                  daemon={daemon}
                  parent={id}
                  field={SITE}
                  multiple
                />
              ))
            )
          }
        </DetailSection>
      </div>
    );
  }
}
