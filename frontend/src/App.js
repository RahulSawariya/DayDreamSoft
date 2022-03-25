import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Routes,Route, BrowserRouter as Router} from 'react-router-dom';

// components
import Signin from './components/Signin';
import Signup from './components/Signup';
import Signout from './components/Signout';
import ViewUser from './components/ViewUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/view_user" element={<ViewUser/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/signout" element={<Signout/>}></Route>
        <Route path="/" element={<Signin/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
