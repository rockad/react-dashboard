import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
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
    <form noValidate autoComplete="off" onSubmit={submit}>
      <div className={classes.container}>
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
        <Button disabled={message.length === 0} type="submit" color="primary" variant="contained">
          Send
        </Button>
      </div>
    </form>
  );
}

ChatInput.propTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default withStyles(styles)(ChatInput);
