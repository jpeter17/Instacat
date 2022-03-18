import { useMemo } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/user';
import useAuthListener from '../hooks/use-auth-listener';

export default function UserCtxProvider({ children }) {
  const { user } = useAuthListener();

  const value = useMemo(
    () => ({
      user
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserCtxProvider.propTypes = {
  children: PropTypes.node.isRequired
};
