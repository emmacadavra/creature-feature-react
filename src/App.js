import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="/signin" element={<h1>Sign In</h1>} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="*" element={<h1>Page not found!</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
