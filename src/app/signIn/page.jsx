"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from "../apicalls/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check if an email is saved in localStorage and pre-fill the input if so
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await signInUser(email, password);
      // Store the token based on "Remember Me" selection
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }
      // handle successful login
      console.log("Signed in successfully:", userData);
      router.push("/generator"); // Redirect to the homepage
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Left Side - Form */}
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Login</h2>
          <p className={styles.formSubtitle}>
            Login to access your ID Photo Generator account
          </p>

          <form onSubmit={handleSignIn}>
            <label className={styles.inputLabel}>Email</label>
            <input
              type="email"
              placeholder="Email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className={styles.inputLabel}>Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <div className={styles.actions}>
              <label className={styles.rememberLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  style={{ marginRight: "8px" }}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{" "}
                Remember me
              </label>
            </div>

            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>

          <p className={styles.signupLink}>
            Don’t have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push("/signUp");
              }}
            >
              Sign up
            </a>
          </p>

          <div className={styles.divider}>
            <hr className={styles.dividerLine} />
            <span className={styles.dividerText}>Or Login With</span>
            <hr className={styles.dividerLine} />
          </div>

          <button className={styles.googleButton}>
            <img
              src="/images/google.png"
              alt="Google icon"
              className={styles.googleIcon}
            />{" "}
            Google
          </button>
        </div>

        {/* Right Side - Image */}
        <div className={styles.imageSection}>
          <img
            src="/images/id-photo-login.jpeg"
            alt="Illustration"
            className={styles.illustration}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
