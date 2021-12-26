
import React from 'react';
import { ToolbarIcon, } from '@rmwc/toolbar';
import { ACTION, SCRIPT } from '../../constants';
import { CardAction } from './Card';
import AbstractDetails from './DetailsAbstract';
import DetailSection from './DetailSection';

const Details = (props) => {
  const {
    project, site, id, field, create, bind, daemon
  } = props;
  return (
    <DetailSection title={field} action={<ToolbarIcon theme="text-primary-on-light" icon="add" onClick={create(field, field, bind)} />}>
      {
        Array.isArray(props[field]) && (
          props[field].map(i => (
            <CardAction
              key={i}
              id={i}
              project={project}
              daemon={daemon}
              site={site}
              parent={id}
              field={field}
              multiple
            />
          ))
        )
      }
    </DetailSection>
  );
};

export default class extends AbstractDetails {
  render() {
    return (
      <div>
        <Details {...this.props} field={ACTION} bind={SCRIPT} create={this.create} />
      </div>
    );
  }
}
