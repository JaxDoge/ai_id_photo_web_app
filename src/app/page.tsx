"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SignIn from "./signIn/page";
import GeneratorPage from "./generator/page";
import UserProfilePage from "./profile/page";
import UserProfileHistoryPage from "./history/page";
import Navigation from "./NavigationBar/navigation";
import { UserProvider } from "../contexts/UserContext";

const Page = () => {
  const pathname = usePathname(); 
  const [currentPage, setCurrentPage] = useState(<SignIn />);

  useEffect(() => {
    // Update the current page based on the path
    const renderPage = () => {
      switch (pathname) {
        case "/generator":
          return (
            <>
              <Navigation />
              <GeneratorPage />
            </>
          );
        case "/profile":
          return (
            <>
              <Navigation />
              <UserProfilePage />
            </>
          );
        case "/history":
          return (
            <>
              <Navigation />
              <UserProfileHistoryPage />
            </>
          );
        default:
          return <SignIn />;
      }
    };

    setCurrentPage(renderPage());
  }, [pathname]); 

  return <UserProvider>{currentPage}</UserProvider>;
};

export default Page;
