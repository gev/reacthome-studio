
import React from 'react';
import { ToolbarIcon, } from 'rmwc/Toolbar';
import { PARENT, SITE, SCENE } from '../../constants';
import DetailSection from './DetailSection';
import AbstractDetails from './DetailsAbstract';
import Card from './Card';

type Props = {
  id: string;
  project: string;
  field: string;
  bind: string;
  create: (field: string, type: string) => void
};

const Details = (props: Props) => {
  const {
    project, id, field, create, bind
  } = props;
  return (
    <DetailSection title={field} action={<ToolbarIcon theme="text-primary-on-light" use="add" onClick={create(field, field, bind)} />}>
      {
        props[field] && (
          props[field].map(i => (
            <Card key={i} id={i} project={project} parent={id} field={field} multiple />
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
        <Details {...this.props} field={SITE} bind={PARENT} create={this.create} />
        <Details {...this.props} field={SCENE} bind={SITE} create={this.create} />
      </div>
    );
  }
}
