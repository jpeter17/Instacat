import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // have a user, so we can store in localstorage
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // don't have a user, so we clear localstorage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user };
}
