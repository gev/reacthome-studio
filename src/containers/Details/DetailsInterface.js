
import React from 'react';
import { ToolbarIcon, } from 'rmwc/Toolbar';
import Card from './Card';
import { SITE, INTERFACE } from '../../constants';
import DetailSection from './DetailSection';
import DetailsAbstract from './DetailsAbstract';

export default class extends DetailsAbstract {
  render() {
    const { project, id, site } = this.props;
    return (
      <div>
        <DetailSection title={SITE} action={<ToolbarIcon use="add" onClick={this.create(SITE, INTERFACE, SITE)} />}>
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
