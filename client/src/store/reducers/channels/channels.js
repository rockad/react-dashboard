import {types} from '../../actions/channels/channels';

const initialState = {
  list: [],
  isLoading: false,
  isLoadingMessages: true,
};

const actionsMap = {
  [types.LIST.REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [types.LIST.SUCCESS]: (state, payload) => ({
    ...state,
    list: payload,
    isLoading: false,
  }),
  [types.LIST.FAILURE]: (state, payload) => ({
    ...state,
    error: payload,
    isLoading: false,
  }),
  [types.LOAD_MESSAGES.REQUEST]: (state) => ({
    ...state,
    isLoadingMessages: true,
  }),
  [types.LOAD_MESSAGES.SUCCESS]: (state, payload, meta) => ({
    ...state,
    messages: {
      ...state.messages,
      [payload.name]: payload.messages,
    },
    isLoadingMessages: false,
  }),
  [types.LOAD_MESSAGES.FAILURE]: (state, payload) => ({
    ...state,
    error: payload,
    isLoadingMessages: false,
  }),
  [types.POST_MESSAGE.REQUEST]: (state) => ({
    ...state,
    isPostingMessage: true,
  }),
  [types.POST_MESSAGE.SUCCESS]: (state) => ({
    ...state,
    isPostingMessage: false,
  }),
  [types.LOAD_MESSAGES.FAILURE]: (state, payload) => ({
    ...state,
    error: payload,
    isPostingMessage: false,
  }),
};

export default function reducer(state = initialState, action) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action.payload, action.meta) : state;
}
