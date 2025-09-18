import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import BackButton from "./BackButton";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

function RegisterHook() {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch,
  } = useForm({ mode: "onChange" });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [userFocus, setUserFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const REGEX = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  };

  async function onSubmit({ email, password }) {
    try {
      const response = await axios.post("/register", {
        email,
        password,
      });
      toast.success("Registration successful!");
    } catch (error) {
      setError(error.response?.data || "Registration failed");
      setSuccess(false);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="errmsg">{error}</p>}
        {success && <p className="successmsg">Success!</p>}
        <h1>Register</h1>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          {...register("email", {
            required: true,
            pattern: { value: REGEX.email },
          })}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby="uidnote"
          autoComplete="off"
        />
        {userFocus && errors.email?.type === "pattern" && (
          <p id="uidnote" className="instructions">
            Invalid email address.
            <br />
          </p>
        )}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          {...register("password", { required: true, pattern: REGEX.password })}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          aria-invalid={errors.password ? "true" : "false"}
          aria-describedby="passnote"
          autoComplete="off"
        />
        {pwdFocus && errors.password?.type === "pattern" && (
          <p id="passnote" className="instructions">
            <FontAwesomeIcon icon={faExclamationCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            <br />
          </p>
        )}

        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === watch("password"),
          })}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          aria-invalid={errors.confirmPassword ? "true" : "false"}
          aria-describedby="confirmnote"
          autoComplete="off"
        />
        {matchFocus && errors.confirmPassword?.type === "validate" && (
          <p id="confirmnote" className="instructions">
            <FontAwesomeIcon icon={faExclamationCircle} />
            Must match the first password.
          </p>
        )}
        <button type="submit" disabled={!isValid}>
          Register
        </button>
      </form>
      <BackButton />
    </section>
  );
}

export default RegisterHook;
