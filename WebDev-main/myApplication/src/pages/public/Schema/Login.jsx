import { Link, useNavigate } from "react-router-dom";
import "../../../App.css"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schema/login.schema";
import React from "react";
import { useApi } from "../../hooks/useAPi";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const { callApi } = useApi();
  const [error, setError] = React.useState(null);

  const handleLogin = async (loginData) => {
    console.log(loginData);

    try {
      setError(null);
      const res = await callApi("POST", "/api/login", { data: loginData });
      console.log(res);
      // Store user info and token
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("access_token", res.data.user?.id || "");
      // Navigate to home or dashboard
      navigate("/", { replace: true });
    } catch (e) {
      setError(e.message || "Login failed. Please try again.");
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="container-fluid flex flex-column p-3">
        <div className="register-card">
          <h2>Login to Your Account</h2>
          <p className="subtitle">Please fill in the details below</p>

          {error && (
            <div style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffc107',
              color: '#856404',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                {...register("email")}
                type="text"
                placeholder="Enter Email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter Password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button type="submit" className="btn">
              Login
            </button>

            <p className="login-text">
              Don't have an account?
              <Link to="/register"> Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;