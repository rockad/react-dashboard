import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';


import {loadMessages} from '../../store/actions/channels/channels';

import Message from '../Message';
import getSocket from '../../helpers/io';

const styles = {
  messages: {
    height: '100%',
    maxHeight: '100%',
    overflow: 'auto',
  },
};

function scrollMsgList(id) {
  const container = document.getElementById(id);
  container.scrollTop = container.scrollHeight - container.clientHeight;
}

function MessageList({messages, isLoading, classes, channel, loadMessages}) {
  const [messagesIo, setMessagesIo] = React.useState([]);

  const hasMessages = messages
    && Object.hasOwnProperty.call(messages, channel)
    && messages[channel].length > 0;

  function addMessage(message) {
    setMessagesIo([
      ...messagesIo,
      message,
    ]);
  }

  React.useEffect(() => {
    const socket = getSocket(`/channel-${channel}`);
    socket.on('message', addMessage);
  });

  React.useEffect(() => {
    loadMessages(channel);
  }, [channel]);

  React.useEffect(() => {
    setMessagesIo(hasMessages ? messages[channel] : []);
  }, [(hasMessages ? messages[channel] : []).length]);

  React.useEffect(() => {
    scrollMsgList('messageList');
  }, [messagesIo.length]);

  return (
    <div className={classes.messages} id="messageList">
      {isLoading && (<LinearProgress />)}
      {messagesIo.length > 0 ? (
        <div className={classes.list}>
          {messagesIo.map((message) => (
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

const mapDispatchToProps = {
  loadMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MessageList));
