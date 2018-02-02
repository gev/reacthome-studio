import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui'
import reducers from './reducers'
import { Main } from './containers'

const history = createBrowserHistory()

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(thunk, routerMiddleware(history))
)

const theme = createMuiTheme();

export default class extends Component {

    render() {
      return (
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <Route exact path="/" component={Main}/>
            </MuiThemeProvider>
          </ConnectedRouter>
        </Provider>
      );
    }

};
