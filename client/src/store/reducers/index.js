import {combineReducers} from 'redux';
import channels from './channels/channels';

export default function createRootReducer() {
  return combineReducers({
    channels,
  });
}
