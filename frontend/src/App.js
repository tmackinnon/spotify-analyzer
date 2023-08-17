import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { useState } from 'react';


export default function App() {

  // const [name, setName] = useState('')

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code');
  console.log('code', code);
  
  return (
    <div className="App">
      <header className='bg-success text-white d-flex p-4'>
        <h1 className='fw-bold'>Spotify Analyzer</h1>
        {/* {name ? <h1 className='fw-bold m-3'>{name}'s Dashboard</h1> : ''} */}
      </header>
      {code ? <Dashboard code={code}/> : <Login/>}
    </div>
  );
}
