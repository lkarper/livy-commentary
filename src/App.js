import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import CommentaryHome from './CommentaryHome/CommentaryHome';
import CommentaryRead from './CommentaryRead/CommentaryRead';
import './App.css';

const App = (props) => {
  return (
    <div className="App">
      <Header />
      <main>
        <Route 
          exact path="/"
          component={CommentaryHome}
        />
        <Route 
          path='/commentary-read/:location'
          component={CommentaryRead}
        />
      </main>
    </div>
  );
}

export default App;
