import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'mobx-react';
import { HistoryAdapter } from 'mobx-state-router';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import { RootStore } from './common/stores';
import { history } from './common/router/history';

const rootStore = new RootStore();
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history)
historyAdapter.observeRouterStateChanges();

const theme = createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary: {
            main: '#DC3912',
        },
        secondary: {
            main: '#FF9900'
        },
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider rootStore={rootStore}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
