"use client";

import "./historyPage.css";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const UserProfileHistoryPage = () => {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString("en-US", options);
        setCurrentDate(formattedDate);
    }, []);

    // const [user, setUser] = useState({
    //     user_first_name: '',
    //     user_last_name: '',
    //     user_email: '',
    // });

    // useEffect(() => {
    //     // Fetch user data from the API
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await fetch('/api/user'); // API route
    //             const data = await response.json();
    //             setUser(data);
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };
    //     fetchUserData();
    // }, []);

    return (
        <div className="profileContainer">
            {/* Left Sidebar */}
            <aside className="leftSidebar">
                <div style={{marginTop: 100}}></div>
                    <button className="icon" onClick={() => router.push('/profile')}>
                        <img src="/images/icons/icon1.png" alt="Documents" />
                    </button>
                    <button className="icon active" onClick={() => router.push('/history')}>
                        <img src="/images/icons/icon2.png" alt="Documents" />
                    </button>
            </aside>
        
            {/* Main Content */}
            <main className="mainContent">
                {/* Top Section */}
                <div className="topSection">
                    {/* switching "Amanda to user_first_name" */}
                    <h1 className="welcomeMessage">Welcome, Amanda</h1>
                    <p className="date">{currentDate}</p>
                </div>
                
                {/* Middle Section */}
                <div className="middleSection">
                    <div className="colorBar"></div>
                        <div className="contentBody">
                            <div className="profileInfo">
                                <img
                                    src="/images/ToBeDelete/portrait.png"
                                    alt="Profile"
                                    className="profileImage"
                                />
                                <div className="userInfo">
                                    {/* switching here to user_first_name and user_last_name and email */}
                                    <h2 className="profileName">
                                        Amanda Rawles
                                        {/* {user.user_first_name} {user.user_last_name} */}
                                    </h2>

                                    <Link href="/profile" className="profileEmail">
                                        amandarawles@gmail.com
                                        {/* {user.user_email} */}
                                    </Link>
                                </div>
                                <button className="downloadButton">Download All</button>
                            </div>
                        </div>
                        {/* Bottom Section */}
                        <div className="bottomSection">
                            <h3 className="historyTitle">ID Photo History</h3>
                            <div className="photoGrid">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="photoItem">
                                        <img
                                            src={`/images/ToBeDelete/h${index + 1}.png`}
                                            alt={`Photo ${index + 1}`}
                                            className="photoImage"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
        

                </div>
            </main>
        </div>
    );
};

export default UserProfileHistoryPage