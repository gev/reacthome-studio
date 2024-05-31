
import { Tab, TabBar } from '@rmwc/tabs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modify } from '../../../actions';
import { DI } from '../../../constants';
import CardDiBind from './CardDiBind';


class Container extends Component {
  state = { index: 0 }

  select = ({ detail: { index } }) => {
    this.setState({ index });
  }

  render() {
    const { index } = this.state;
    const { id, button, project } = this.props;
    return (
      <div>
        <TabBar activeTabIndex={index} onActivate={this.select}>
          {(new Array(button)).fill(0).map((_, i) => (
            <Tab key={`${id}/tab/di/${i}`}>{i + 1}</Tab>
          ))}
        </TabBar>
        <div className="paper">
          <CardDiBind id={`${id}/${DI}/${index + 1}`} project={project} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    change: (payload) => modify(id, payload)
  }, dispatch)
)(Container);
