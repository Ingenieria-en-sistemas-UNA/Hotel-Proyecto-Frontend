
import React, { Component } from 'react'
import Header from './structure/Header'
import Drawer from './structure/Drawer'
import PropTypes from 'prop-types'
import Container from './structure/Container'
import {
  withStyles,
  CssBaseline
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});


class Layout extends Component {

  render() {
    const { classes, children } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <Drawer />
        <Container>{children}</Container>
      </div>
    )
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);
