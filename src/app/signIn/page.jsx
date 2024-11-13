"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInUser, googleSignIn } from "../apicalls/users";
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

  const handleGoogleResponse = async (response) => {
    const idToken = response.credential;
    try {
      // Send token to backend
      await googleSignIn(idToken);
      console.log("Google sign-in successful");
      router.push("/generator"); // Redirect after sign-in
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  // Initialize Google Sign-In button
  useEffect(() => {
    console.log("Google Client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    // Function to add the Google Sign-In script dynamically
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
          });
          window.google.accounts.id.renderButton(
            document.getElementById("googleSignInButton"),
            { theme: "outline", size: "large" }
          );
        }
      };
    };

    // Load the script when the component mounts
    loadGoogleScript();

    return () => {
      const googleScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (googleScript) googleScript.remove(); // Clean up the script on unmount
    };
  }, []);

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

          {/* Google Sign-In Button */}
          <div id="googleSignInButton" className={styles.googleButton}></div>
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
