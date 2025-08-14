import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "../components/Button";
import LabeledForm from "../components/LabeledForm";
import ScreenFrame from "../components/ScreenFrame";
import shootingStar from "../assets/shooting-star.svg";
import "./styles/AuthenticationPages.css";

function LoginPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          email: formValues.email,
          password: formValues.password,
        },
        { withCredentials: true }
      );
      setError("");
      console.log("Login successful:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
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
          </div>
          <div className="gap" />
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
