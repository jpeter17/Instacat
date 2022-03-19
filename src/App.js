import { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import IsUserLoggedIn from './helpers/is-user-logged-in';
import ProtectedRoute from './helpers/protected-route';
import useAuthListener from './hooks/use-auth-listener';

const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const Profile = lazy(() => import('./pages/profile'));

export default function App() {
  const { user } = useAuthListener();

  const memoizedUser = useMemo(
    () => ({
      user
    }),
    [user]
  );

  return (
    <UserContext.Provider value={memoizedUser}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRoute user={user}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.LOGIN}
              element={
                <IsUserLoggedIn user={user}>
                  <Login />
                </IsUserLoggedIn>
              }
            />
            <Route
              path={ROUTES.SIGN_UP}
              element={
                <IsUserLoggedIn user={user}>
                  <SignUp />
                </IsUserLoggedIn>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
