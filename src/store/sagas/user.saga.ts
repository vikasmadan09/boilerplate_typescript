import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { fetchData } from '../slices/user.slice';

export interface ResponseGenerator {
  config?: any;
  data: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
const getUsers = () => axios.get('https://randomuser.me/api/?results=10');

export default function* userSaga() {
  try {
    const result: ResponseGenerator = yield call(getUsers);
    yield put(fetchData(result.data));
  } catch (e) {
    yield put({ type: 'FETCH_DATA_FAILED' });
  }
}
