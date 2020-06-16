import React, { useState } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'


function App() {

  return (
    <div>
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      {/* <Redirect from='/' to='/Login' /> */}
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/signup" component={Register} />
    </BrowserRouter>
    </div>
  );
};
  
export default App;
  