import styles from "./App.module.css";
import NavBar from "./components/NavBar.jsx";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import "./api/axiosDefaults.js";
import SignUpForm from "./pages/auth/SignUpForm.jsx";
import SignInForm from "./pages/auth/SignInForm.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/profiles/ProfilePage.jsx";
import { ProfilesProvider } from "./contexts/ProfileDataContext.jsx";

function App() {
  return (
    <AuthProvider>
      <ProfilesProvider>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/profiles/:id" element={<ProfilePage />} />
              <Route path="*" element={<h1>Page not found!</h1>} />
            </Routes>
          </Container>
        </div>
      </ProfilesProvider>
    </AuthProvider>
  );
}

export default App;
