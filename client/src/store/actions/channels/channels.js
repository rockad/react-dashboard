import {RSAA} from 'redux-api-middleware';
import {getBackendEndpoint} from '../../../helpers/api';
import {dispatchThunk} from '../../../helpers/actions';

export const types = {
  LOAD_MESSAGES: {
    REQUEST: 'channels/LOAD_MESSAGES_REQUEST',
    SUCCESS: 'channels/LOAD_MESSAGES_SUCCESS',
    FAILURE: 'channels/LOAD_MESSAGES_FAILURE',
  },
  LIST: {
    REQUEST: 'channels/LIST_REQUEST',
    SUCCESS: 'channels/LIST_SUCCESS',
    FAILURE: 'channels/LIST_FAILURE',
  },
  PENDING: {
    UPDATE: 'channels/PENDING_UPDATE',
    PROCESS: 'channels/PENDING_PROCESS',
  },
  POST_MESSAGE: {
    REQUEST: 'channels/POST_MESSAGE_REQUEST',
    SUCCESS: 'channels/POST_MESSAGE_SUCCESS',
    FAILURE: 'channels/POST_MESSAGE_FAILURE',
  },
};

export function loadList() {
  return dispatchThunk({
    [RSAA]: {
      endpoint: getBackendEndpoint('/channels'),
      types: [
        types.LIST.REQUEST,
        types.LIST.SUCCESS,
        types.LIST.FAILURE,
      ],
    },
  });
}

export function loadMessages(channel) {
  return dispatchThunk({
    [RSAA]: {
      endpoint: getBackendEndpoint(`/messages/${channel}`),
      types: [
        types.LOAD_MESSAGES.REQUEST,
        types.LOAD_MESSAGES.SUCCESS,
        types.LOAD_MESSAGES.FAILURE,
      ],
    },
  });
}

export function post(channel, message) {
  return dispatchThunk({
    [RSAA]: {
      endpoint: getBackendEndpoint(`/${channel}`),
      method: 'PUT',
      body: JSON.stringify({message}),
      types: [
        types.POST_MESSAGE.REQUEST,
        types.POST_MESSAGE.SUCCESS,
        types.POST_MESSAGE.FAILURE,
      ],
    },
  });
}
