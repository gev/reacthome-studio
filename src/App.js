
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { RMWCProvider } from '@rmwc/provider';
import 'material-components-web/dist/material-components-web.min.css';
import { Main, Project, ServiceManager } from './containers';
import { ACTION, ACTION_TYPE } from './constants';
import { modify, offline } from './actions';
import createStore from './store';
import reducer from './reducer';
import { init } from './assets';
import { STATE_JSON } from './assets/constants';
import { readFile, exists } from './fs';
import discovery from './discovery';

const history = createHashHistory();

export default class extends Component {
  state = {};

  async componentWillMount() {
    await init();
    const pool = ((await exists(STATE_JSON)) ? JSON.parse(await readFile(STATE_JSON)) : {});
    const store = createStore(reducer, { pool }, history);
    const { root } = store.getState().pool;
    if (root && root.daemon) root.daemon.forEach(id => store.dispatch(offline(id)));
    // ACTION_TYPE.forEach((a) => {
    //   store.dispatch(modify(a, { type: ACTION, code: a }));
    // });
    store.dispatch(discovery());
    this.setState({ store });
  }

  render() {
    const { store } = this.state;
    return store ? (
      <Provider store={store}>
        <ServiceManager>
          <RMWCProvider>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/project/:project/:id/:field" component={Project} />
                <Route path="/project/:project/:id" component={Project} />
                <Route path="/project/:project" component={Project} />
              </Switch>
            </ConnectedRouter>
          </RMWCProvider>
        </ServiceManager>
      </Provider>
    ) : (
      <div />
    );
  }
}
