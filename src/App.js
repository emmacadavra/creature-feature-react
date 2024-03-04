import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { AuthProvider } from "./contexts/AuthContext";
import Homepage from "./pages/Homepage.jsx";

function App() {
  return (
    <AuthProvider>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="*" element={<h1>Page not found!</h1>} />
          </Routes>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
