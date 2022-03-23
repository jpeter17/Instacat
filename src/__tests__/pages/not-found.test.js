/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import NotFound from '../../pages/not-found';

describe('<Not Found />', () => {
  it('renders the not found page with a logged in user', () => {
    const { queryByText } = render(
      <Router>
        <FirebaseContext.Provider value={{}}>
          <UserContext.Provider value={{ user: {} }}>
            <NotFound />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    );
    expect(queryByText('Not Found!')).toBeTruthy();
    expect(queryByText('Log In')).toBeFalsy();
    expect(document.title).toEqual('Not Found - Instacat');
  });

  it('renders the not found page with no active logged in user', async () => {
    const { queryByText } = render(
      <Router>
        <FirebaseContext.Provider value={{}}>
          <UserContext.Provider value={{ user: null }}>
            <NotFound />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    );

    expect(queryByText('Not Found!')).toBeTruthy();
    expect(queryByText('Log In')).toBeTruthy();
    expect(document.title).toEqual('Not Found - Instacat');
  });
});
