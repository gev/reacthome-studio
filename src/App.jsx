// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';
import createStore from './store';
import { Main } from './containers';

const history = createHashHistory();
const store = createStore(history);
const theme = createMuiTheme();

export default class extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
