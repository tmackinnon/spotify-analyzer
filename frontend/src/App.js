import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Dashboard from './components/Dashboard';
import Login from './components/Login';


export default function App() {

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code');
  console.log('code', code);
  
  return (
    <div className="App">
      <header>
        <h1>Spotify Analyzer</h1>
      </header>
      {code ? <Dashboard code={code}/> : <Login/>}
    </div>
  );
}
