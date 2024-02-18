import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { useEffect } from "react";
import axios from "axios";
import { AuthProvider, useAuth } from "./contexts/AuthContext.js";

function App() {
  const auth = useAuth();
  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      auth.setCurrentUser(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <AuthProvider>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Routes>
            <Route path="/" element={<h1>Homepage</h1>} />
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
