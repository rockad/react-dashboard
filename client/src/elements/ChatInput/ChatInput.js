import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  button: {
    marginLeft: 'auto',
  },
});

function ChatInput({classes, onSubmit}) {
  const [message, setMessage] = React.useState('');

  function handleChange(event) {
    setMessage(`${event.target.value}`.trim());
  }

  function submit(event) {
    event.preventDefault();
    setMessage('');
    if (onSubmit) {
      onSubmit(message);
    }
  }

  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={submit}>
      <TextField
        id="message"
        placeholder="Message"
        className={classes.textField}
        value={message}
        onChange={handleChange}
        margin="normal"
        required
        autoFocus
      />
      <Button
        disabled={message.length === 0}
        type="submit"
        color="primary"
        variant="contained"
        className={classes.button}
      >
        Send
      </Button>
    </form>
  );
}

ChatInput.propTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default withStyles(styles)(ChatInput);
