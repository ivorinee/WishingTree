import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { checkLoggedIn } from "../api/authApi";

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      const result = await checkLoggedIn();
      if (result.loggedIn) {
        setAuthorized(true);
      } else {
        navigate("/login");
      }
      setLoading(false);
    }
    verify();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return authorized ? children : null;
}

export default PrivateRoute;
