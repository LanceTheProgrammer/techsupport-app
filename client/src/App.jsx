import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";

// AuthContext for managing authentication state
const AuthContext = React.createContext(null);

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token on the server
      fetch("/api/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.valid) {
            setUser({ token });
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const signin = async (username, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser({ token: data.token });
        return true;
      }
    } catch (error) {
      console.error("Error during signin:", error);
    }
    return false;
  };

  const signout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Fixed PrivateRoute component for React Router v6
function PrivateRoute({ children }) {
  let auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use the navigate function from useNavigate hook
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await auth.signin(username, password);
    if (success) {
      navigate("/admin"); // Correct usage of navigate for programmatic routing
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/admin">Admin Panel</Link>
              </li>
              <AuthButton />
            </ul>
          </nav>

          <Routes>
            <Route
              exact
              path="/"
              element={<h1>Home Page</h1>} // Wrap the h1 inside element prop
            />
            <Route
              path="/login"
              element={<LoginPage />} // Correct usage of Route with element
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              } // Correct usage of Route with PrivateRoute
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function AuthButton() {
  let navigate = useNavigate(); // Corrected history to navigate
  let auth = useAuth();

  return auth.user ? (
    <button
      onClick={() => {
        auth.signout();
        navigate("/"); // Correct usage of navigate to go back to home
      }}
    >
      Sign out
    </button>
  ) : (
    <Link to="/login">Login</Link>
  );
}

export default App;
