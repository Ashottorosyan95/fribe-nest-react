import React, { useEffect, useState } from "react";
import fribeLogo from "../../assets/images/fribe-logo.png";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/apis";
import { useSnackbar } from "notistack";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleLoginClick = async () => {
    if (!email) {
      setErrors({
        ...errors,
        email: "Email address is required.",
      });
    } else if (!password) {
      setErrors({
        ...errors,
        password: "Password is required.",
      });
    } else {
      if (!errors.email && !errors.password) {
        const data = { email, password }
        const res = await login(data, enqueueSnackbar)
        if (res.status === 200) {
          localStorage.access_token = res.data.data.accessToken;
          localStorage.selectedPage = "dashboard";
          navigate("/dashboard");
        }
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!e.target.value) {
      setErrors({
        ...errors,
        email: "Email address is required.",
      });
    } else if (!emailRegex.test(e.target.value)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email address",
      });
    } else {
      setErrors({
        ...errors,
        email: "",
      });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!e.target.value) {
      setErrors({
        ...errors,
        password: "Password is required.",
      });
    } else if (!passwordRegex.test(e.target.value)) {
      setErrors({
        ...errors,
        password: "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
      });
      return false;
    } else {
      setErrors({
        ...errors,
        password: "",
      });
      return true;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLoginClick();
    }
  };

  useEffect(() => {
    if (localStorage.access_token) {
      navigate("/dashboard");
    }
  }, [navigate])

  return (
    <div className="root-container">
      <div className="d-flex justify-content-center align-items-center flex-column p-2">
        <div className="web-name-text-large log-in-web-name-text">
          <img src={fribeLogo} alt="fribe-logo" />
          <div>Fribe</div>
        </div>
        <div className="primary-form-card w-100">
          <div className="mb-3">
            <label htmlFor="email" className="form-label primary-form-label">
              Email address
            </label>
            <input
              type="text"
              autoComplete="off"
              required
              className="form-control form-control-lg primary-form-control"
              id="email"
              placeholder="example@email.com"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
            />
            {errors.email ? (
              <span className="text-danger">{errors.email}</span>
            ) : null}
          </div>
          <div>
            <label htmlFor="password" className="form-label primary-form-label">
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              required
              className="form-control form-control-lg primary-form-control"
              id="password"
              placeholder="****************"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
            />
            {errors.password ? (
              <span className="text-danger">{errors.password}</span>
            ) : null}
          </div>
          <div className="text-center">
            <button
              className="btn fribe-primary-btn mt-4 w-100"
              onClick={handleLoginClick}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
