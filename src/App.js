import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import join from './components/Join/Join.js';
import Chat from './components/Chat/Chat';


const App = () =>(
  <Router>
    <Route path="/" exact component={join}></Route>
    <Route path="/Chat"  component={Chat}></Route>
  </Router>
);
export default App;