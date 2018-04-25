
import React from 'react';
import { ToolbarIcon, } from 'rmwc/Toolbar';
import Card from './Card';
import { SITE, INTERFACE } from '../../constants';
import DetailSection from './DetailSection';
import AbstractDetails from './AbstractDetails';

export default class extends AbstractDetails {
  render() {
    const { project, id, site } = this.props;
    return (
      <div>
        <DetailSection title={SITE} action={<ToolbarIcon use="add" onClick={this.add(SITE, INTERFACE)} />}>
          {
            site && (
              site.map(i => (
                <Card key={i} id={i} project={project} parent={id} field={SITE} multiple />
              ))
            )
          }
        </DetailSection>
      </div>
    );
  }
}
