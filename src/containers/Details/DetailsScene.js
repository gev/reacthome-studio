
import React from 'react';
import { ToolbarIcon, } from '@rmwc/toolbar';
import { SCENE } from '../../constants';
import Autocomplete from '../Filter';
import DetailSection from './DetailSection';
import AbstractDetails from './DetailsAbstract';
import Card from './Card';

export default class extends AbstractDetails {
  state = {};

  select = (bind) => {
    this.setState({ bind });
  }

  click = () => {
    const { bind } = this.state;
    const { add } = this.props;
    add(SCENE, bind);
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
            <ToolbarIcon key="add" theme="text-primary-on-background" icon="add" onClick={this.click} />
          ]}
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
