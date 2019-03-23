import {createStore} from 'redux';
import {createBrowserHistory} from 'history';
import composeMiddlewares from './middlewares';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState = {}) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return createStore(
    createRootReducer(history),
    preloadedState,
    composeMiddlewares({
      history,
      isDevelopment,
    }),
  );
}
