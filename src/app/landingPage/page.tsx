"use client";

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '../../contexts/UserContext';
import Image from 'next/image';
import styles from './Landing.module.css';

const LandingPage = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const handleGetStarted = () => {
    if (user) {
      router.push('/generator');
    } else {
      router.push('/signIn');
    }
  };

  const handleSignUp = () => {
    router.push('/signUp');
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          AI ID Photo
        </div>
        {!user && (
          <div className={styles.authButtons}>
            <button 
              onClick={() => router.push('/signIn')}
              className={styles.signInButton}
            >
              Sign In
            </button>
            <button 
              onClick={handleSignUp}
              className={styles.signUpButton}
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

      <main className={styles.main}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Create Perfect ID Photos with AI
          </h1>
          <p className={styles.subtitle}>
            Professional ID photos for passports, visas, and documents in seconds
          </p>
          <button 
            onClick={handleGetStarted}
            className={styles.ctaButton}
          >
            {user ? 'Go to Generator' : 'Get Started'}
          </button>
        </div>
        <div className={styles.heroImage}>
          {/* Add your hero image here */}
          <Image 
            src="/images/hero-image.jpeg"
            alt="AI ID Photo Demo"
            width={600}
            height={400}
            priority
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;