import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../services/UserContext";
import ApiService from "../../services/ApiService";
import styles from "./Login.module.css";
import { hashPassword } from "../../services/encryptService";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const hashedPassword = await hashPassword(password);
      const response = await ApiService.request({
        url: `http://localhost:3000/users?username=${currentUser.username}&&password=${hashedPassword}`,
      });
      
      const existingUser = response.user;

      if (existingUser) {
        setCurrentUser({
          username: existingUser.username,
          id: existingUser.id,
          email: existingUser.email,
        });
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ username: existingUser.username, id: existingUser.id , email: existingUser.email })
        );
        navigate(`/users/${existingUser.id}/home`);
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      // console.error("Error loading users:", error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.loginContainer_unique}>
      <div className={styles.loginCard_unique}>
        <h2 className={styles.loginHeader_unique}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.group_unique}>
            <input
              className={styles.inputField_unique}
              type="text"
              value={currentUser.username}
              onChange={(e) =>
                setCurrentUser((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              required
            />
            <label className={styles.labelField_unique}>Username</label>
          </div>
          <div className={styles.group_unique}>
            <input
              className={styles.inputField_unique}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className={styles.labelField_unique}>Password</label>
          </div>
          {error && <p className={styles.errorMessage_unique}>{error}</p>}
          <button className={styles.button_unique} type="submit">
            Login
          </button>
        </form>
        <button
          type="button"
          className={styles.secondaryButton_unique}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
