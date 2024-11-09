import { PersistConfig, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import rootReducer from './rootReducer';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user', 'schools', 'classes', 'specialities', 'students', 'subjects', 'verdicts'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
