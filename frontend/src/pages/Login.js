import React, { useState } from "react";
import { loginUser } from "../api/Login";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import { Helmet } from "react-helmet-async"; // ✅ استدعاء Helmet

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      // ✅ خزن بيانات المستخدم والتوكن في localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // ✅ التوجيه بعد تسجيل الدخول
      navigate("/Home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMsg("Incorrect email or password.");
      } else if (error.response) {
        setErrorMsg(`Error ${error.response.status}: ${error.response.data}`);
      } else {
        setErrorMsg("Server connection error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Login | English Buzz DZ - Free English Courses & Books</title>
        <meta
          name="description"
          content="Login to English Buzz DZ to access free English courses, books, exams, and resources designed for students in Algeria."
        />
        <meta
          name="keywords"
          content="English Buzz DZ login, English courses Algeria, free English books, English exams, student resources"
        />
      </Helmet>

      <div className="login-bg">
        <div className="login-container">
          <h2>Welcome Back</h2>

          {errorMsg && <div className="alert alert-danger text-center">{errorMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="text-center mt-3">
            <span>Don’t have an account? </span>
            <Link to="/users">Create one</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
