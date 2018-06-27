
import React from 'react';
import { ToolbarIcon, } from 'rmwc/Toolbar';
import { ACTION, SCENE } from '../../constants';
import { CardAction } from './Card';
import AbstractDetails from './DetailsAbstract';
import DetailSection from './DetailSection';

type Props = {
  id: string;
  project: string;
  site: string;
  field: string;
  bind: string;
  create: (field: string, type: string) => void
};

const Details = (props: Props) => {
  const {
    project, site, id, field, create, bind
  } = props;
  return (
    <DetailSection title={field} action={<ToolbarIcon theme="text-primary-on-light" use="add" onClick={create(field, field, bind)} />}>
      {
        props[field] && (
          props[field].map(i => (
            <CardAction
              key={i}
              id={i}
              project={project}
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
        <Details {...this.props} field={ACTION} bind={SCENE} create={this.create} />
      </div>
    );
  }
}
