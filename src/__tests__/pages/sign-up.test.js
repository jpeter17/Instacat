/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import SignUp from '../../pages/sign-up';
import FirebaseContext from '../../context/firebase';
import { doesUsernameExist } from '../../services/firebase';
import * as ROUTES from '../../constants/routes';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

jest.mock('../../services/firebase');

describe('<SignUp />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sign up page with a form submission and signs a user up', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          add: jest.fn(() => Promise.resolve('User added'))
        }))
      })),
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: { updateProfile: jest.fn(() => Promise.resolve('I am signed up!')) }
        }))
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve(true)); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'jake' } });
      await fireEvent.change(getByPlaceholderText('Full name'), {
        target: { value: 'Jake Petersen' }
      });
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'jake@gmail.com' }
      });
      await fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
      fireEvent.submit(getByTestId('sign-up'));

      expect(document.title).toEqual('Sign Up - Instacat');
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith('jake');

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Username').value).toBe('jake');
        expect(getByPlaceholderText('Full name').value).toBe('Jake Petersen');
        expect(getByPlaceholderText('Email address').value).toBe('jake@gmail.com');
        expect(getByPlaceholderText('Password').value).toBe('password');
        expect(queryByTestId('error')).toBeFalsy();
      });
    });
  });

  it('renders the sign up page but an error is present (username exists)', async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() => Promise.resolve({}))
          }
        }))
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve([false])); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'jake' } });
      await fireEvent.change(getByPlaceholderText('Full name'), {
        target: { value: 'Jake Petersen' }
      });
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'jake@gmail.com' }
      });
      await fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
      fireEvent.submit(getByTestId('sign-up'));

      expect(document.title).toEqual('Sign Up - Instacat');
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith('jake');

      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Username').value).toBe('');
        expect(getByPlaceholderText('Full name').value).toBe('');
        expect(getByPlaceholderText('Email address').value).toBe('');
        expect(getByPlaceholderText('Password').value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });

  it('renders the sign up page but an error is thrown', async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() => Promise.reject(new Error('Username exists')))
          }
        }))
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve(false)); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'jake' } });
      await fireEvent.change(getByPlaceholderText('Full name'), {
        target: { value: 'Jake Petersen' }
      });
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'jake@gmail.com' }
      });
      await fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
      fireEvent.submit(getByTestId('sign-up'));

      expect(document.title).toEqual('Sign Up - Instacat');
      await expect(doesUsernameExist).toHaveBeenCalled();
      await expect(doesUsernameExist).toHaveBeenCalledWith('jake');

      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Username').value).toBe('');
        expect(getByPlaceholderText('Full name').value).toBe('');
        expect(getByPlaceholderText('Email address').value).toBe('');
        expect(getByPlaceholderText('Password').value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });
});
