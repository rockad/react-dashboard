import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

function styles(theme) {
  return {
    root: {
      padding: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
    },
  };
}

function Message({message, classes}) {
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography>
        <b>{new Date(message.timestamp).toLocaleString()}</b>: {message.text}
      </Typography>
    </Paper>
  );
}

Message.propTypes = {
  classes: PropTypes.object,
  message: PropTypes.shape({
    timestamp: PropTypes.string,
    text: PropTypes.string,
  }),
};

export default withStyles(styles)(Message);
