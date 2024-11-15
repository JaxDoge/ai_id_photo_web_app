"use client";

import "./historyPage.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Link from 'next/link';
import { getLoggedInUserDetails } from "../apicalls/users";
import { fetchHistoryPhotosById } from "../apicalls/history"; 
import { useParams } from "next/navigation";
import NavigationBar from "../NavigationBar/navigation";

const UserProfileHistoryPage = ({ users }) => {
    const { userId } = useParams();
    const API_BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL || "http://localhost:4000";
    const HISTORY_API_URL = `${API_BASE_URL}/users/${userId}/get-photo-history`;
    
    const [userData, setUserData] = useState("");
    const [photos, setPhotos] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    
    // Fetch user data and photos on mount
    useEffect(() => {
        async function loadUserData() {
            try {
                const userResponse = await getLoggedInUserDetails();
                setUserData(userResponse.data);
                const historyResponse = await fetchHistoryPhotosById(userResponse.data._id);
                setPhotos(historyResponse.data);
            } catch (error) {
                console.error("Error loading user data or history:", error);
            }
        }
        loadUserData();

        // Set the current date
        const today = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        setCurrentDate(today.toLocaleDateString("en-US", options));
    }, []);


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

    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString("en-US", options);
        setCurrentDate(formattedDate);
    }, []);

    
    return (
        <div className="profileContainer">
            {/* Left Sidebar */}
            <NavigationBar />
        
            {/* Main Content */}
            <main className="mainContent">
                {/* Top Section */}
                <div className="topSection">
                    {/* switching "Amanda to user_first_name" */}
                    <h1 className="welcomeMessage">Welcome, {userData?.firstName}</h1>
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