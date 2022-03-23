/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Login from '../../pages/login';
import FirebaseContext from '../../context/firebase';
import * as ROUTES from '../../constants/routes';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('<Login />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders the login page with a form submission and logs the user in', async () => {
    const succeedToLogin = jest.fn(() => Promise.resolve('I am signed in!'));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeedToLogin
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );
    await act(async () => {
      expect(document.title).toEqual('Login - Instacat');

      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'jakepetersen1221@gmail.com' }
      });

      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'testpassword' }
      });
      fireEvent.submit(getByTestId('login'));

      expect(succeedToLogin).toHaveBeenCalled();
      expect(succeedToLogin).toHaveBeenCalledWith('jakepetersen1221@gmail.com', 'testpassword');

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Email address').value).toBe('jakepetersen1221@gmail.com');
        expect(getByPlaceholderText('Password').value).toBe('testpassword');
        expect(queryByTestId('error')).toBeFalsy();
      });
    });
  });
  it('renders the login page with a form submission and fails to login the user', async () => {
    const failToLogin = jest.fn(() => Promise.reject(new Error('I am signed in!')));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: failToLogin
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>
    );
    await act(async () => {
      expect(document.title).toEqual('Login - Instacat');

      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'jake.com' }
      });

      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'testpassword' }
      });
      fireEvent.submit(getByTestId('login'));

      expect(failToLogin).toHaveBeenCalled();
      expect(failToLogin).toHaveBeenCalledWith('jake.com', 'testpassword');

      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Email address').value).toBe('');
        expect(getByPlaceholderText('Password').value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });
});
