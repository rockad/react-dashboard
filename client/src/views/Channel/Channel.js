import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import {loadMessages, post} from '../../store/actions/channels/channels';
import Message from '../../elements/Message';
import ChatInput from '../../elements/ChatInput';
import MessageList from '../../elements/MessageList';

function styles(theme) {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    messages: {
      height: '100%',
      maxHeight: '100%',
      overflow: 'auto',
    },
    chatInput: {
      marginTop: theme.spacing.unit * 3,
      height: 64,
      flex: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  };
};

function Channel({match, loadMessages, classes, postMessage}) {
  const {channel} = match.params;
  const [lastUpdated, setLastUpdated] = React.useState(0);

  React.useEffect(() => {
    loadMessages(channel);
  }, [channel, lastUpdated]);

  function post(message) {
    postMessage(channel, message)
      .then(() => {
        setLastUpdated(new Date().getTime());
      });
  }

  return (
    <div className={classes.container}>
      <MessageList channel={channel} />
      <div className={classes.chatInput}>
        <ChatInput onSubmit={post} />
      </div>
    </div>
  );
}

Channel.propTypes = {
  classes: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      channel: PropTypes.string,
    }),
  }),
  loadMessages: PropTypes.func,
  messages: PropTypes.object,
  isLoading: PropTypes.bool,
};

const mapDispatchToProps = {
  loadMessages,
  postMessage: post,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Channel));
