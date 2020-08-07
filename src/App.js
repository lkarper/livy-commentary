import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import CommentaryHome from './CommentaryHome/CommentaryHome';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <CommentaryHome />
      </main>
    </div>
  );
}

export default App;
