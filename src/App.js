import { Button } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <p>Hello, world!</p>
      <p>
        <Button variant="warning">Warning</Button>
      </p>
    </div>
  );
}

export default App;
