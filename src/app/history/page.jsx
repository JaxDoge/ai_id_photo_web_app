"use client";

import "./historyPage.css";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const UserProfileHistoryPage = () => {
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        const imgUrls = Array.from({ length: 10 }).map((_, index) => `/images/ToBeDelete/h${index + 1}.png`);
        
        // Checking each image if exists or not
        Promise.all(
            imgUrls.map((url) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => resolve(url);
                    img.onerror = () => resolve(null);
                })
            )
        ).then((results) => {
            // Filter not existing images right here
            setExistingImages(results.filter((url) => url !== null));
        });
    }, []);

    // Download single image function
    function downloadImage(url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Download all function
    function downloadAllImages() {
        if (window.confirm("Are you sure you want to download all images?")) {
            existingImages.forEach((url, index) => {
                setTimeout(() => {
                    downloadImage(url);
                }, index * 500); // Avoiding download all at the same time (debug unstopable pop-up window)
            });
        }
    }

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
                <button className="icon" onClick={() => router.push('/generator')}>
                    <i className="fas fa-house" />
                </button>
                <button className="icon" onClick={() => router.push('/profile')}>
                    <i className="fa-solid fa-grip" />
                </button>
                <button className="icon active" onClick={() => router.push('/history')}>
                    <i className="fas fa-file-alt" />
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
                            <button className="downloadButton" onClick={downloadAllImages}>
                                Download All
                            </button>
                        </div>
                    </div>
                    {/* Bottom Section */}
                    <div className="bottomSection">
                        <h3 className="historyTitle">ID Photo History</h3>
                        <div className="photoGrid">
                            {existingImages.map((url, index) => (
                                <div key={index} className="photoItem">
                                    <img
                                        src={url}
                                        alt={`Photo ${index + 1}`}
                                        className="photoImage"
                                        onError={(e) => {
                                            // Hidding not existing figures
                                            e.target.closest('.photoItem').style.display = 'none';
                                        }}
                                    />
                                    <div className="overlay">
                                        <i 
                                            className="fas fa-download faDownload"
                                            onClick={() => downloadImage(url)} 
                                        />
                                    </div>
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