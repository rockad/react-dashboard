import {applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {apiMiddleware} from 'redux-api-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';

import RSAAHeadersMiddleware from './RSAA/headers';

export default function composeMiddlewares({history, isDevelopment}) {
  const middlewares = applyMiddleware(
    RSAAHeadersMiddleware,
    apiMiddleware,
    thunkMiddleware,
  );

  return isDevelopment ? composeWithDevTools(middlewares) : compose(middlewares);
}
