import React, { useState } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Nav from './components/Nav'
import Login from './components/Login'
import SignUp from './components/Signup';
import Confirm from './components/Confirm';
import MakeBet from './components/MakeBet';


function App() {

  return (
    <div>
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      {/* <Redirect from='/' to='/Login' /> */}
      <Route exact path="/home" component={Nav} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/new" component={Confirm} />
      {/* <Route exact path="/make_bet" component={MakeBet} /> */}
    </BrowserRouter>
    </div>
  );
};
  
export default App;
  