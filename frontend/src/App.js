import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { useState } from 'react';
import Nav from './components/Nav';
import useCode from './components/useCode';


export default function App() {

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code');
  
  return (
    <div className="App">
      {code ? <Dashboard code={code}/> : <Login/>}
    </div>
  );
}
