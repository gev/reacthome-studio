
import React from 'react';
import { ToolbarIcon, } from '@rmwc/toolbar';
import Card from './Card';
import { SITE, INTERFACE } from '../../constants';
import DetailSection from './DetailSection';
import DetailsAbstract from './DetailsAbstract';

export default class extends DetailsAbstract {
  render() {
    const {
      project, id, site, daemon
    } = this.props;
    return (
      <div>
        <DetailSection title={SITE} action={<ToolbarIcon icon="add" onClick={this.create(SITE, INTERFACE, SITE)} />}>
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
