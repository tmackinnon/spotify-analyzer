import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';


export default function App() {

  const tokens = new URLSearchParams(window.location.hash.substring(1));
  const access = tokens.get('access_token');
  const refresh = tokens.get('refresh_token');
  
  return (
    <div className="App">
      <header>
        <h1>Spotify Analyzer</h1>
      </header>
      {access ? <Dashboard accessToken={access} refreshToken={refresh}/> : <Login/>}
    </div>
  );
}
