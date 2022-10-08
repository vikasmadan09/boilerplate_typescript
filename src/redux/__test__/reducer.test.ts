import reducer, { fetchData } from '../getUsers.slice';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ data: { results: [] }, error: '', isLoading: false });
});
test('should handle a todo being added to an empty list', () => {
  const prevState = { isLoading: false, error: '', data: { results: [] } };
  const data = {
    results: [{ name: { first: 'vikas', last: 'madan' } }],
  };
  expect(reducer(prevState, fetchData(data))).toEqual({ data, isLoading: false, error: '' });
});
