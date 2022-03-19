import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export default function IsUserLoggedIn({ user, children }) {
  return user ? <Navigate to={-1} /> : children;
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired
};
