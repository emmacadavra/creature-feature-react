import logo from './logo.svg';
import { Button } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, world!
        </p>
        <p>
          <Button variant="warning">Warning</Button>
        </p>
      </header>
    </div>
  );
}

export default App;
