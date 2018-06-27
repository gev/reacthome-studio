
import React from 'react';
import { ToolbarIcon, } from 'rmwc/Toolbar';
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
    const {
      id, add, get, set, remove, field
    } = this.props;
    remove(get(bind).site, field, bind);
    add(field, bind);
    set(bind, { site: id });
  }

  render() {
    const { bind } = this.state;
    const {
      project, id, field
    } = this.props;
    return (
      <div>
        <DetailSection
          title={field}
          action={[
            <div key="select" style={{ paddingLeft: 24 }}><Autocomplete id={bind} root={project} onSelect={this.select} /></div>,
            <ToolbarIcon key="add" theme="text-primary-on-background" use="add" onClick={this.click} />
          ]}
        >
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
