
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { RMWCProvider } from '@rmwc/provider';
import 'material-components-web/dist/material-components-web.min.css';
import { Main, Project, ServiceManager } from './containers';
import createStore from './store';
import reducer from './reducer';
import { init } from './assets';
import discovery from './discovery';
import { offline } from './websocket/online';
import Daemon from './containers/Daemon';
import { cleanup } from './state';

const history = createHashHistory();

export default class extends Component {
  state = {};

  async componentWillMount() {
    await init();
    const pool = {};
    console.log(localStorage.length);
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        pool[key] = JSON.parse(value);
      }
    } catch (e) {
      console.error(e);
    }
    cleanup(pool);
    console.log(localStorage.length);
    const store = createStore(reducer, { pool }, history);
    const { root } = store.getState().pool;
    if (root && root.daemon) {
      root.daemon.forEach(id => store.dispatch(offline(id)));
    }
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
                <Route path="/daemon/:daemon/:id" component={Daemon} />
                <Route path="/daemon/:daemon" component={Daemon} />
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
