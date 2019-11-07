import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouterView } from 'mobx-state-router';

import { AppBar, Toolbar, Typography, withStyles, Link, Container, Grid } from '@material-ui/core';

import { appStyles } from './App.styles';

import { WelcomePage, QuestionsPage, AdminPage } from './pages';

const viewMap = {
  home: <WelcomePage />,
  questions: <QuestionsPage />,
  admin: <AdminPage />
};

@inject(i => ({
  routerStore: i.rootStore.routerStore
}))
@observer
class App extends React.Component {
  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link style={{ fontFamily: 'Monoton', fontSize: '30px', textShadow: "2px 2px #ccc", textDecoration: 'none' }} href="/" color="inherit">Voter</Link>
            </Typography>
            <Link href="/questions" color="inherit">Quiz</Link>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid
            container
            justify="center"
            alignContent="center"
          >
            <RouterView routerStore={this.props.routerStore} viewMap={viewMap} />
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(appStyles)(App);