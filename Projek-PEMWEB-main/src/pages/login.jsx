import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost/api/login/login.php", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.data)); // PERBAIKI DISINI (data.data)
        alert("Login berhasil!");

        if (res.data.data.role === "admin") {
          history.push("/admin/dashboard");
        } else {
          history.push("/home");
        }
      } else {
        alert(res.data.message || "Login gagal.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Gagal menghubungi server.");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
