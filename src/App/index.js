
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';
import createStore from './store';
import rootReducer from './reducer';
import AppManager from './AppManager';
import Main from '../containers';

const history = createHashHistory();
const store = createStore(rootReducer, history);
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#e0e0e0',
      dark: '#aeaeae',
      contrastText: '#424242',
    },
    secondary: {
      light: '#67daff',
      main: '#03a9f4',
      dark: '#007ac1',
      contrastText: '#fafafa',
    },
  },
});

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppManager>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <Switch>
                <Route exact path="/" component={Main} />
              </Switch>
            </MuiThemeProvider>
          </ConnectedRouter>
        </AppManager>
      </Provider>
    );
  }
}

export { default as Apps } from './Apps';
