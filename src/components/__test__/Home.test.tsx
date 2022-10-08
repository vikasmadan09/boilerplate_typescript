import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { put } from 'redux-saga/effects';
import Home from '../Home';
import { renderWithProviders } from '../../../utils/test-utils';
import { sagaActions } from 'src/sagaActions';

import { fetchData } from 'src/redux/getUsers.slice';
// import { sagaActions } from 'src/sagaActions';

// import { useSelector, useDispatch } from 'react-redux';

// const mockDispatch = jest.fn();
// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
//   useDispatch: () => mockDispatch,
// }));

describe('Home component', () => {
  test('test load', async () => {
    renderWithProviders(<Home />);
    const element = screen.getByText(/home page/i);
    expect(element).toBeInTheDocument();
  });
  test('test saga', async () => {
    renderWithProviders(<Home />);
    put({ type: sagaActions.FETCH_DATA_SAGA });
  });
  test('Uses preloaded state to render', () => {
    const preState = {
      isLoading: false,
      error: '',
      data: {
        results: [{ name: { first: 'vikas', last: 'madan' }, email: 'vikas@email.com', picture: { thumbnail: 'img' } }],
      },
    };
    const { store } = renderWithProviders(<Home />, {
      preloadedState: {
        users: preState,
      },
    });
    expect(store.getState().users).toEqual(preState);
  });
  test('dispatch an action and check for the provided name', async () => {
    // const dummyDispatch = jest.fn();
    // store.dispatch(() => dummyDispatch);
    // useDispatchMock.mockReturnValue(dummyDispatch);
    // rerender(<Home />);÷
    // const btn = screen.getByRole('button');
    // const element = await screen.findByText(/doe john/i);
    // fireEvent.click(btn);
    // useDispatchMock.mockReturnValue(dummyDispatch);
    act(() => {
      const { store } = renderWithProviders(<Home />);

      store.dispatch(
        fetchData({
          results: [{ name: { first: 'Singa', last: 'Binga' }, email: 'test@t.com', picture: { thumbnail: '/s' } }],
        }),
      );
    });

    const fullName = await screen.findByText(/singa binga/i);
    expect(fullName.textContent).toBe('Singa Binga');
  });

  test('filter the list', async () => {
    act(() => {
      const { store } = renderWithProviders(<Home />);

      store.dispatch(
        fetchData({
          results: [
            { name: { first: 'Samuel', last: 'Binga' }, email: 'test@t.com', picture: { thumbnail: '/s' } },
            { name: { first: 'Samuel', last: 'Henry' }, email: 'chris@t.com', picture: { thumbnail: '/s' } },
          ],
        }),
      );
    });

    const inputElement = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Samuel Binga' } });
    expect(inputElement.value).toBe('Samuel Binga');
    screen.debug();
  });
});
