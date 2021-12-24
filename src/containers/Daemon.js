
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from './Toolbar';
import Details from './Details';
import { TERMINAL, ROOT, PROJECT } from '../constants';
import Terminal from './Terminal';
import { bindActionCreators } from 'redux';
import { add } from '../actions';

class Daemon extends Component {
  componentDidMount() {
    if (this.props.project)
      this.props.add(ROOT, PROJECT, this.props.project)
  }
  render() {
    const {
      title, match: { params: { id, daemon } }, project
    } = this.props;
    const isTerminal = id === TERMINAL;
    return (
      <div className="project">
        <div style={{ height: 64 }}>
          <Toolbar project={project} id={id} title={title} openMenu={this.openMenu} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="container">
            {
              isTerminal &&
                <Terminal daemon={daemon} project={project} />
            }
            {
              !(isTerminal) &&
                <Details daemon={daemon} project={project} id={id || daemon} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { match: { params: { daemon } } }) => pool[daemon] || {},
  (dispatch) => bindActionCreators({add}, dispatch)
)(Daemon);
