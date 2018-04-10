
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField } from 'rmwc/TextField';
import { ToolbarIcon, } from 'rmwc/Toolbar';
import { set, create } from '../../actions';
import Card from './Card';
import SelectDaemon from './SelectDaemon';
import { TITLE, LOCATION, PROJECT, DAEMON } from '../../constants';
import DetailSection from './DetailSection';

type Props = {
  id: string,
  type: ?string,
  project: ?string,
  daemon: ?string,
  field: ?string,
  title: ?string,
  change: (field: string, value: string) => void,
  add: (field: string) => void
};

class Details extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  add = (field) => () => {
    this.props.add(field);
  }

  render() {
    const {
      project, id, field, title, type, daemon
    } = this.props;
    const isLocation = type === LOCATION;
    const isProject = type === PROJECT;
    const hasLocation = isProject || isLocation;
    const f = hasLocation ? field || LOCATION : field;
    return (
      <div className="paper content">
        <div className="paper">
          <TextField id={TITLE} value={title || ''} onChange={this.change} fullwidth placeholder="Untitled" style={{ fontSize: 48 }} />
        </div>
        {
          isProject && (
            <DetailSection
              title={DAEMON}
              action={
                <SelectDaemon
                  id={id}
                  value={daemon}
                  handle={<ToolbarIcon use="more_horiz" />}
                />
              }
            >
              <Card id={daemon} project={project} parent={id} field={DAEMON} />
            </DetailSection>
          )
        }
        {
          f && (
            <DetailSection title={f} action={<ToolbarIcon use="add" onClick={this.add(f)} />}>
              {
                this.props[f] && (
                  this.props[f].map(i => (
                    <Card key={i} id={i} project={project} parent={id} field={field} multiple />
                  ))
                )
              }
            </DetailSection>
          )
        }
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => set(id, payload),
    add: (field) => create(id, field)
  }, dispatch)
)(Details);
