import { combineReducers } from 'redux-immutablejs';
import { reducer as form } from 'redux-form/immutable';
import authReducer, { moduleName as authModule } from '../ducks/auth';

export default combineReducers({
  form,
  [authModule]: authReducer,
});
