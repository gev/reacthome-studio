
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Typography from 'rmwc/Typography';
import { SITE } from '../../constants';

type Props = {
  project: string,
  site: [],
  level: ?number,
  selected: ?string;
  to: (site: string) => void
};

class GridHeaderColumn extends Component<Props> {
  to = (site) => () => {
    this.props.to(site);
  }

  render() {
    const {
      project, site, level = 0, selected
    } = this.props;
    return (
      site.map(l => [
        <tr key={l.id} className={level === 0 ? 'level-0' : ''}>
          <td>
            <div
              className={`grid-cell ${l.id === selected ? 'grid-cell-hover' : ''}`}
              style={{ textIndent: 24 * level }}
              onClick={this.to(l.id)}
            >
              <Typography use="caption">{l.title || l.id}</Typography>
            </div>
          </td>
        </tr>,
        <Row key={`sub-${l.id}`} id={l.id} level={level + 1} project={project} selected={selected}/>
      ])
    );
  }
}

const Row = connect(
  ({ pool }, { id }) => ({
    site: ((pool[id] || {}).site || []).map(i =>
      ({ id: i, ...pool[i] }))
  }),
  (dispatch, { project }) => bindActionCreators({
    to: (site) => push(`/project/${project}/${site}/${SITE}`)
  }, dispatch)
)(GridHeaderColumn);

export default Row;
