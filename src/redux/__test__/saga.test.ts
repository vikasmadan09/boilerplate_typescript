import { runSaga } from 'redux-saga';
import { fetchDataSaga } from '../getUsers.services';

import axios from 'src/__mocks__/axios';

describe('', () => {
  beforeEach(() => {
    jest.mock('../../__mocks__/axios');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should test makeFetchTodosRequest saga', async () => {
    // will override the response from fake axios.js file
    const mockedResponse = {
      results: [
        {
          name: {
            first: 'Victor',
            name: 'Sams',
          },
          email: 'victor@email.com',
          picture: {
            thumbnail: '/thumbnail',
          },
        },
      ],
    };
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: mockedResponse,
      }),
    );
    const dispatched: any[] = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchDataSaga,
    ).toPromise();

    expect(dispatched[0].payload).toEqual(mockedResponse);
  });
  it('should test rejected saga', async () => {
    jest.mock('axios');
    axios.get.mockRejectedValue(new Error('api call failed'));

    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchDataSaga,
    ).toPromise();
    expect(dispatched[0].payload).toBe('api call failed');
    expect(dispatched[0].type).toEqual('FETCH_DATA_FAILED');
  });
});
