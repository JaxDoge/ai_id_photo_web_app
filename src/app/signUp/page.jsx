"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const router = useRouter();

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

          <form>
            <div className={styles.inputGroup}>
              <div>
                <label className={styles.inputLabel}>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className={styles.inputField}
                />
              </div>

              <div>
                <label className={styles.inputLabel}>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={styles.inputField}
                />
              </div>
            </div>

            <div>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                placeholder="Email"
                className={styles.inputField}
              />
            </div>

            <div className={styles.passwordContainer}>
              <label className={styles.inputLabel}>Password</label>
              <input
                type="password"
                placeholder="Password"
                className={styles.inputField}
              />
            </div>

            <div className={styles.passwordContainer}>
              <label className={styles.inputLabel}>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.inputField}
              />
            </div>

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
