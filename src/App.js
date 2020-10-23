import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import CommentaryHome from './CommentaryHome/CommentaryHome';
import CommentaryRead from './CommentaryRead/CommentaryRead';
import IdleService from './services/idle-service';
import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import PublicOnlyRoute from './utils/PublicOnlyRoute';
import PrivateOnlyRoute from './utils/PrivateOnlyRoute';
import './App.css';
import EditPage from './Admin/EditPage/EditPage';

const useForceUpdate = () => {
  const [value, setValue] = useState(0); 
  return () => setValue(value + 1); 
}

const App = (props) => {

  const forceUpdate = useForceUpdate();

  const logoutFromIdle = () => {
      /* remove the token from localStorage */
      TokenService.clearAuthToken();
      /* remove any queued calls to the refresh endpoint */
      TokenService.clearCallbackBeforeExpiry();
      /* remove the timeouts that auto logout when idle */
      IdleService.unRegisterIdleResets();
      /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
      */
      forceUpdate();
  }

  useEffect(() => {
      /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
      */
      IdleService.setIdleCallback(logoutFromIdle);

      /* if a user is logged in */
      if (TokenService.hasAuthToken()) {
          /*
          tell the idle service to register event listeners
          the event listeners are fired when a user does something, e.g. move their mouse
          if the user doesn't trigger one of these event listeners,
              the idleCallback (logout) will be invoked
          */
          IdleService.regiserIdleTimerResets();

          /*
          Tell the token service to read the JWT, looking at the exp value
          and queue a timeout just before the token expires
          */
          TokenService.queueCallbackBeforeExpiry(() => {
              /* the timeout will call this callback just before the token expires */
              AuthApiService.postRefreshToken();
          });
      }

      return function cleanup() {
          /*
          when the app unmounts,
          stop the event listeners that auto logout (clear the token from storage)
          */
          IdleService.unRegisterIdleResets();
          /*
          and remove the refresh endpoint request
          */
          TokenService.clearCallbackBeforeExpiry();
      }
      
  });

  return (
    <div className="App">
      <Header forceUpdate={forceUpdate} />
      <main>
        <Route 
          exact path="/"
          component={CommentaryHome}
        />
        <Route 
          path='/commentary-read/:location'
          component={CommentaryRead}
        />
        <PublicOnlyRoute 
          path='/admin-login'
          render={rProps => <AdminLogin {...rProps} forceUpdate={forceUpdate} />}
        />
        <PrivateOnlyRoute 
          path='/edit'
          component={EditPage}
        />
      </main>
    </div>
  );
}

export default App;
