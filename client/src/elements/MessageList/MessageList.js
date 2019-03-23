import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import Message from '../Message';

function styles() {
  return {
    messages: {
      height: '100%',
      maxHeight: '100%',
      overflow: 'auto',
    },
  };
}

function scrollMsgList(id) {
  const container = document.getElementById(id);
  container.scrollTop = container.scrollHeight - container.clientHeight;
}

function MessageList({messages, isLoading, classes, channel}) {
  if (isLoading) {
    return (<LinearProgress />);
  }

  const hasMessages = messages
    && Object.hasOwnProperty.call(messages, channel)
    && messages[channel].length > 0;

  React.useEffect(() => {
    scrollMsgList('messageList');
  }, [hasMessages && messages[channel].length]);

  return (
    <div className={classes.messages} id="messageList">
      {hasMessages ? (
        <div className={classes.list}>
          {messages[channel].map((message) => (
              <Message key={message.timestamp} message={message} />
            ),
          )}
        </div>
      ) : (
         <Typography>
           No messages yet
         </Typography>
       )}
    </div>
  );
}

MessageList.propTypes = {
  messages: PropTypes.object,
  isLoading: PropTypes.bool,
};

function mapStateToProps({channels}) {
  return {
    messages: channels.messages,
    isLoading: channels.isLoadingMessages,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(MessageList));
