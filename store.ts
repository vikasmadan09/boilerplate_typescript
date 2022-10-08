import { configureStore, combineReducers } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from './src/redux/getUsers.services';
import getUsersReducer from './src/redux/getUsers.slice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  users: getUsersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware).concat(logger),
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof rootReducer>;
export default store;
