
import React from 'react';
import { ToolbarIcon, } from '@rmwc/toolbar';
import Card from './Card';
import DetailSection from './DetailSection';
import AbstractDetails from './DetailsAbstract';
import { SITE } from '../../constants';

export default class extends AbstractDetails {
  render() {
    const {
      project, id, field, daemon
    } = this.props;
    return (
      <div>
        <DetailSection title={field} action={<ToolbarIcon key="add" theme="text-primary-on-background" icon="add" onClick={this.create(field, field, SITE)} />}>
          {
            Array.isArray(this.props[field]) && (
              this.props[field].map(i => (
                <Card
                  key={i}
                  id={i}
                  project={project}
                  daemon={daemon}
                  parent={id}
                  field={field}
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
