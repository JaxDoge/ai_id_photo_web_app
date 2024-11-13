"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpUser } from "../apicalls/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const newUserData = await signUpUser(
        firstName,
        lastName,
        email,
        password
      );

      console.log("Account created successfully:", newUserData);
      // Show alert message on successful signup
      alert(
        "Account created successfully! You will be redirected to the sign-in page."
      );
      router.push("/signIn"); // Redirect to login page after signup
    } catch (err) {
      setError("Error creating account. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Left Side - Image */}
        <div className={styles.imageSection}>
          <img
            src="/images/id-photo-signup.jpeg"
            alt="Sign-up Illustration"
            className={styles.illustration}
          />
        </div>

        {/* Right Side - Form */}
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Sign up</h2>
          <p className={styles.formSubtitle}>
            Let’s get you all set up so you can access your personal account.
          </p>

          <form onSubmit={handleSignUp}>
            <div className={styles.inputGroup}>
              <div>
                <label className={styles.inputLabel}>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className={styles.inputField}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className={styles.inputLabel}>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={styles.inputField}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                placeholder="Email"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.passwordContainer}>
              <label className={styles.inputLabel}>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            <div className={styles.passwordContainer}>
              <label className={styles.inputLabel}>Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={styles.inputField}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
                className={styles.eyeIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.createAccountButton}>
              Create Account
            </button>
          </form>

          <p className={styles.loginLink}>
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push("/signIn");
              }}
            >
              Log in
            </a>
          </p>

          <div className={styles.divider}>
            <hr className={styles.dividerLine} />
            <span className={styles.dividerText}>Or sign up with</span>
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
      </div>
    </div>
  );
};

export default SignUp;
