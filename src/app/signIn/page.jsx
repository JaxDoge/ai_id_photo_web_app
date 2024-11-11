"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from '../apicalls/users';
import styles from "./SignIn.module.css";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await signInUser(email, password);
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
                type="password"
                placeholder="********"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.actions}>
              <label className={styles.rememberLabel}>
                <input type="checkbox" style={{ marginRight: "8px" }} />{" "}
                Remember me
              </label>
              <a href="#" className={styles.forgotPassword}>
                Forgot Password
              </a>
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
            <span className={styles.dividerText}>Or login with</span>
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
