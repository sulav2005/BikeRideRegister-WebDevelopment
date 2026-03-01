import { Link, useNavigate } from "react-router-dom";
import "../../../App.css"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schema/login.schema";

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

  const handleLogin = async (loginData) => {
    console.log(loginData);

    try {
      const res = await callApi("POST", "/auth/login", { data: loginData });
      console.log(res);
      localStorage.setItem("access_token", res?.data?.access_token);
      navigate("/product", { replace: true });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="container-fluid flex flex-column p-3">
        <div class="register-card">
          <h2>Create Account</h2>
          <p class="subtitle">Please fill in the details below</p>

          <form onSubmit={handleSubmit(handleLogin)}>
            <div class="form-group">
              <label>Email Address</label>
              <input
                {...register("email")}
                type="text"
                placeholder="Enter Email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter Password"
              />
              {errors.password && <p>{errors.email.password}</p>}
            </div>

            <button type="submit" class="btn">
              Login
            </button>

            <p class="login-text">
              Already have an account?
              <Link to="/register"> Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;