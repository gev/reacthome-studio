
import React from 'react';
import { ToolbarIcon, } from 'rmwc/Toolbar';
import Card from './Card';
import DetailSection from './DetailSection';
import AbstractDetails from './DetailsAbstract';
import { SITE } from '../../constants';

export default class extends AbstractDetails {
  render() {
    const {
      project, id, field,
    } = this.props;
    return (
      <div>
        <DetailSection title={field} action={<ToolbarIcon key="add" theme="text-primary-on-background" use="add" onClick={this.create(field, field, SITE)} />}>
          {
            this.props[field] && (
              this.props[field].map(i => (
                <Card key={i} id={i} project={project} parent={id} field={field} multiple />
              ))
            )
          }
        </DetailSection>
      </div>
    );
  }
}
