
import { ToolbarIcon, } from '@rmwc/toolbar';
import React from 'react';
import { PARENT, SITE } from '../../constants';
import Card from './Card';
import DetailSection from './DetailSection';
import AbstractDetails from './DetailsAbstract';


const Details = (props) => {
  const {
    project, id, field, create, bind, daemon
  } = props;
  return (
    <DetailSection title={field} action={<ToolbarIcon theme="text-primary-on-light" icon="add" onClick={create(field, field, bind)} />}>
      {
        Array.isArray(props[field]) && (
          props[field].map(i => (
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
  );
};

export default class extends AbstractDetails {
  create = (field, type) => () => {
    this.props.create(field, type, PARENT);
  }
  render() {
    return (
      <div>
        <Details {...this.props} field={SITE} bind={PARENT} create={this.create} />
      </div>
    );
  }
}
