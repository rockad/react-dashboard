import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './layout';
import LazyComponent from './elements/LazyComponent';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route
            exact
            path="/"
            component={LazyComponent(() => import('./views/Home'))}
          />
          />
          <Route
            path="/:channel"
            component={LazyComponent(() => import('./views/Channel'))}
          />
          <Route component={LazyComponent(() => import('./views/NotFound'))} />
        </Switch>
      </Layout>
    </MuiThemeProvider>

  );
}

export default App;
