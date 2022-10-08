import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { fetchData } from './getUsers.slice';
import { sagaActions } from '../sagaActions';
export interface ResponseGenerator {
  config?: unknown;
  data: unknown;
  headers?: unknown;
  request?: unknown;
  status?: number;
  statusText?: string;
}
const getUsers = () => axios.get('https://randomuser.me/api/?results=10');

export function* fetchDataSaga(): any {
  try {
    const result = yield call(getUsers);
    yield put(fetchData(result.data));
  } catch (e: any) {
    yield put({ type: 'FETCH_DATA_FAILED', payload: e?.message });
  }
}

export default function* rootSaga() {
  yield takeLatest(sagaActions.FETCH_DATA_SAGA, fetchDataSaga);
}
// sagaActions.FETCH_DATA_SAGA;
