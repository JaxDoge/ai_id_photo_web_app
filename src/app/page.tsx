"use client";

import React from 'react';
import SignIn from './signIn/page';
import UserProfileHistoryPage from './history/page';

const Page = () => {
  return (
    <div>
      <SignIn />;
      <UserProfileHistoryPage />;
    </div>
  )
};

export default Page;