import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../services/UserContext";
import ApiService from "../../services/ApiService";
import styles from "./Login.module.css"; // שימוש באותו CSS מודול

const Register = () => {
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleInitialRegister = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log(currentUser.username)


    try {
      const user = await ApiService.request({
        url: `http://localhost:3000/users?username=${currentUser.username}`,
      });
      if (user) {
        setError("Username already exists");
        return;
      }
      else {
        console.log("User does not exist, proceeding to next step");
        setError("");
        setStep(2);
      }

    } catch (error) {
      console.error("Error during registration:", error);
      setError("Error connecting to the server");
    }
  };

  const handleCompleteRegister = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        username: currentUser.username,
        email: email,
        password: password,
      };

      const savedUser = await ApiService.request({
        url: "http://localhost:3000/users",
        method: "POST",
        body: newUser,
      });

      setCurrentUser({ username: savedUser.username, id: savedUser.id });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ username: savedUser.username, id: savedUser.id })
      );
      setError("");
      navigate(`/users/${savedUser.id}/home`);
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Error connecting to the server");
    }
  };

  return (
    <div className={styles.loginContainer_unique}>
      <div className={styles.loginCard_unique}>
        {step === 1 ? (
          <>
            <h2 className={styles.loginHeader_unique}>Register</h2>
            <form onSubmit={handleInitialRegister}>
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
                <span className={styles.highlight_unique}></span>
                <span className={styles.bar_unique}></span>
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
                <span className={styles.highlight_unique}></span>
                <span className={styles.bar_unique}></span>
                <label className={styles.labelField_unique}>Password</label>
              </div>
              <div className={styles.group_unique}>
                <input
                  className={styles.inputField_unique}
                  type="password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  required
                />
                <span className={styles.highlight_unique}></span>
                <span className={styles.bar_unique}></span>
                <label className={styles.labelField_unique}>Verify Password</label>
              </div>
              {error && <p className={styles.errorMessage_unique}>{error}</p>}
              <button type="submit" className={styles.button_unique}>
                Next
              </button>
            </form>
            <button
              type="button"
              className={styles.secondaryButton_unique}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h2 className={styles.loginHeader_unique}>Complete Registration</h2>
            <form onSubmit={handleCompleteRegister}>
              <div className={styles.group_unique}>
                <input
                  className={styles.inputField_unique}
                  type="text"
                  value={currentUser.username}
                  disabled
                />
                <span className={styles.highlight_unique}></span>
                <span className={styles.bar_unique}></span>
                <label className={styles.labelField_unique}>Username</label>
              </div>
              <div className={styles.group_unique}>
                <input
                  className={styles.inputField_unique}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className={styles.highlight_unique}></span>
                <span className={styles.bar_unique}></span>
                <label className={styles.labelField_unique}>Email</label>
              </div>
              {error && <p className={styles.errorMessage_unique}>{error}</p>}
              <button type="submit" className={styles.button_unique}>
                Complete Registration
              </button>
            </form>
          </>
        )}
      </div>
    </div >
  );
};

export default Register;
