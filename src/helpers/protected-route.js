import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({ user, children }) {
  const state = useLocation();
  return user ? children : <Navigate to={ROUTES.LOGIN} state={state} />;
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired
};
