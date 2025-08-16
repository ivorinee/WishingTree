import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "../components/Button";
import LabeledForm from "../components/LabeledForm";
import ScreenFrame from "../components/ScreenFrame";
import "./styles/AuthenticationPages.css";

function SignUpPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email address", name: "email", type: "text" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];
  const [error, setError] = useState("");

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,50}$/.test(
      password
    );

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  async function handleSignUp(e) {
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
    } else if (!isValidPassword(formValues.password)) {
      setError(
        "Password must be at least 6 characters and include an uppercase letter, a lowercase letter, and a number."
      );
    } else if (formValues.password != formValues.confirmPassword) {
      setError("Passwords do not match.");
    } else {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/signup`,
          {
            name: formValues.name,
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
        setError(error.response.data.message);
      }
    }
  }

  return (
    <ScreenFrame>
      <div className="authentication-page-main-container">
        <div className="authentication-container authentication-container-signup">
          <div className="authentication-heading">
            <h1>Register New Account</h1>
            <p>Get started on your Wishing Tree journey!</p>
          </div>
          <div className="authentication-form-container">
            <LabeledForm
              fields={fields}
              values={formValues}
              onChange={handleChange}
            />
            <p className="authentication-error-placeholder">{error}</p>
          </div>
          {/* <div className="gap" /> */}
          <div className="authentication-button-container">
            <Button
              name="REGISTER"
              style="authentication-button"
              onClick={handleSignUp}
            />
          </div>
        </div>
        {/* <div className="authentication-art-border"></div> */}
      </div>
    </ScreenFrame>
  );
}

export default SignUpPage;
