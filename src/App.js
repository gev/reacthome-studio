
import fs from 'fs';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { RMWCProvider } from '@rmwc/provider';
import 'material-components-web/dist/material-components-web.min.css';
import { Main, Project, ServiceManager } from './containers';
import { FILE, ACTION, ACTION_TYPE } from './constants';
import { modify, offline } from './actions';
import createStore from './store';
import reducer from './reducer';

const history = createHashHistory();
const pool = JSON.parse(fs.readFileSync(FILE));

const store = createStore(reducer, { pool }, history);
const { root } = store.getState().pool;
if (root && root.daemon) root.daemon.forEach(id => store.dispatch(offline(id)));

ACTION_TYPE.forEach((a) => {
  store.dispatch(modify(a, { type: ACTION, code: a }));
});

export default class extends Component {
  render() {
    return (
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
    );
  }
}
