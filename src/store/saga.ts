import { all } from 'redux-saga/effects';
import userSaga from './sagas/user.saga';

export default function* rootSaga() {
  yield all([userSaga()]);
}
