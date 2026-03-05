
import React from "react";
import { Link } from "react-router-dom";
import "../../../App.css"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./schema/register.schema";
import { useApi } from "../../hooks/useAPi";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });
  const { callApi } = useApi();
  const [error, setError] = React.useState(null);

  console.log(errors);
  const handleRegister = async (userData) => {
    try {
      setError(null);
      const { confirmPassword, ...registerData } = userData;
      const res = await callApi("POST", "/api/register", { data: registerData });
      console.log(res);
      alert("Registration successful!");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };
  return (
    <>
      <div className="container-fluid flex flex-column p-3">
        <div className="register-card">
          <h2>Create Account</h2>
          <p className="subtitle">Please fill in the details below</p>

          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Full Name"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter Email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Enter Phone Number"
              />
              {errors.phone && <p>{errors.phone.message}</p>}
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

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>

            {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

            <button type="submit" className="btn">
              Register
            </button>

            <p className="login-text">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
