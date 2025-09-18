import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store";

function LoginHook() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || "/dashboard";
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      email: "stefan@gmail.com",
      password: "Transcom#2",
    },
  });
  const [error, setError] = useState("");

  async function onSubmit({ email, password }) {
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      console.log(response?.data);
      dispatch(loginSuccess(response.data));
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error.response);
      setError(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="errmsg">{error}</p>}
        <h1>Sign in</h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby="uidnote"
          autoComplete="off"
        />
        {errors.email && (
          <p id="uidnote" className="instructions">
            {errors.email.message}
            <br />
          </p>
        )}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
          })}
          aria-invalid={errors.password ? "true" : "false"}
          autoComplete="off"
        />
        {errors.password && (
          <p id="passnote" className="instructions">
            {errors.password.message}
            <br />
          </p>
        )}

        <button type="submit">Sign in</button>
      </form>
      <p className="flex">
        <span>Don't have an account?</span>
        <Link to="/register">Register</Link>
      </p>
    </section>
  );
}

export default LoginHook;
