
import React from 'react';
import { ToolbarIcon, } from '@rmwc/toolbar';
import Autocomplete from '../Filter';
import DetailSection from './DetailSection';
import AbstractDetails from './DetailsAbstract';
import Card from './Card';
import { SITE } from '../../constants';

export default class extends AbstractDetails {
  state = {};

  select = (bind) => {
    this.setState({ bind });
  }

  render() {
    const { bind } = this.state;
    const {
      project, id, field, daemon
    } = this.props;
    return (
      <div>
        <DetailSection
          title={field}
          action={[
            <div key="select" style={{ paddingLeft: 24 }}><Autocomplete id={bind} root={project} onSelect={this.select} /></div>,
            <ToolbarIcon
              key="add"
              theme="text-primary-on-background"
              icon="add"
              onClick={bind ? this.addBind(field, bind, SITE) : this.create(field, field, SITE)}
            />
          ]}
        >
          {
            this.props[field] && (
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
