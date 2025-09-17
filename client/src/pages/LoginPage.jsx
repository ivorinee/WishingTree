import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import LabeledForm from "../components/LabeledForm";
import ScreenFrame from "../components/ScreenFrame";
import { login } from "../api/authApi";
import shootingStar from "../assets/shooting-star.svg";
import "./styles/AuthenticationPages.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const fields = [
    { label: "Email address", name: "email", type: "text" },
    { label: "Password", name: "password", type: "password" },
  ];
  const [error, setError] = useState("");

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (
      formValues.name == "" ||
      formValues.email == "" ||
      formValues.password == "" ||
      formValues.confirmPassword == ""
    ) {
      setError("Please complete all required fields.");
    } else if (!isEmail(formValues.email)) {
      setError("Please enter a valid email address.");
    } else {
      try {
        await login(formValues.email, formValues.password);
        setError("");
        navigate("/home");
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  }

  return (
    <ScreenFrame>
      <div className="authentication-page-main-container">
        <div className="authentication-container">
          <div className="authentication-heading">
            <h1>Login</h1>
            <p>Welcome back to Wishing Tree!</p>
          </div>
          <div className="authentication-form-container">
            <LabeledForm
              fields={fields}
              values={formValues}
              onChange={handleChange}
            />
            <p className="error-placeholder">{error}</p>
          </div>
          <div className="authentication-button-container">
            <Button
              style="authentication-button"
              name="LOGIN"
              onClick={handleLogin}
            />
          </div>
        </div>
        <div className="authentication-art-border">
          <img className="authentication-art" src={shootingStar} />
        </div>
      </div>
    </ScreenFrame>
  );
}

export default LoginPage;
