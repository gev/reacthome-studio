
import React from 'react';
import { ToolbarIcon, } from '@rmwc/toolbar';
import DetailSection from './DetailSection';
import AbstractDetails from './DetailsAbstract';
import Card from './Card';
import { DRIVER } from '../../constants';
import SelectDriver from './SelectDriver';

export default class extends AbstractDetails {
  render() {
    const {
      project, id, field, daemon
    } = this.props;
    return (
      <div>
        <DetailSection
          title={DRIVER}
          action={
            <SelectDriver
              id={id}
              value={daemon}
              handle={<ToolbarIcon theme="text-primary-on-light" icon="add" />}
            />
          }
        >
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
