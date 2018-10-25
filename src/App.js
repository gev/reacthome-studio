
import fs from 'fs';
import Koa from 'koa';
import assets from 'koa-static';
import mount from 'koa-mount';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { RMWCProvider } from '@rmwc/provider';
import 'material-components-web/dist/material-components-web.min.css';
import { Main, Project, ServiceManager } from './containers';
import { FILE, POOL, ACTION, ACTION_TYPE, STATE, ASSETS, ASSETS_DIR, SERVICE_PORT } from './constants';
import { set } from './actions';
import createStore from './store';
import reducer from './reducer';
import state from './state';

const history = createHashHistory();
const pool = JSON.parse(fs.readFileSync(FILE));

const store = createStore(reducer, { [POOL]: pool }, history);
const getState = state(store);

ACTION_TYPE.forEach((a) => {
  store.dispatch(set(a, { type: ACTION, code: a }));
});

const koa = new Koa();
koa.use(mount(`/${ASSETS}`, assets(`./${ASSETS_DIR}/`)));
koa.use(mount(`/${STATE}`, async (ctx, next) => {
  await next();
  const id = ctx.path.substring(1);
  ctx.body = JSON.stringify(getState(id));
}));
koa.listen(SERVICE_PORT);

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
