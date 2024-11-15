"use client";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './signIn/page';
import GeneratorPage from './generator/page';
import UserProfilePage from './profile/page';
import UserProfileHistoryPage from './history/page';
import Navigation from './NavigationBar/navigation';

const Page = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/generator"
          element={
            <>
              <Navigation />
              <GeneratorPage />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navigation />
              <UserProfilePage />
            </>
          }
        />
        <Route
          path="/history"
          element={
            <>
              <Navigation />
              <UserProfileHistoryPage />
            </>
          }
        />
      </Routes>
    </Router>
  );

  // return (
  //   <Router>
  //     <Routes>
  //       {/* Main Page Before SignIn */}
  //       <Route path="/" element={<SignIn />} />
  //       {/* Main Page After SignIn */}
  //       <Route path="/generator" element={<GeneratorPage />} />
  //       <Route path="/profile" element={<UserProfilePage />} />
  //       <Route path="/history" element={<UserProfileHistoryPage users={[]} />} />
  //     </Routes>
  //   </Router>
  // );
};

// const Page = () => {
//   return (
//     <div>
//       <SignIn />;
//     </div>
//   )
// };

export default Page;