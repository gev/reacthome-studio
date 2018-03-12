
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';
import { MuiThemeProvider as OldMuiThemeProvider } from 'material-ui-old';
import { getMuiTheme } from 'material-ui-old/styles';
import { Main } from './containers';
import rootReducer from './reducers';
import createStore from './store';

const history = createHashHistory();
const store = createStore(rootReducer, history);

const palette = {
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
};

const theme1 = createMuiTheme(palette);
const theme0 = getMuiTheme(palette);

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme1}>
            <OldMuiThemeProvider muiTheme={theme0}>
              <Switch>
                <Route exact path="/" component={Main} />
              </Switch>
            </OldMuiThemeProvider>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
