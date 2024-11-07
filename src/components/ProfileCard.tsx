"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./profilePage.css";

const ProfileCard = () => {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEmail, setNewEmail] = useState("");

    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString("en-US", options);
        setCurrentDate(formattedDate);
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChangeEmailClick = () => {
        setIsModalOpen(true); // Open the modal
    };

    const handleSaveEmail = () => {
        console.log("New email added:", newEmail);
        setIsModalOpen(false); // Close the modal after saving
        setNewEmail(""); // Clear the input field
    };

    return (
        <div className="profileContainer">
            {/* Left Sidebar */}
            <aside className="leftSidebar">
                <button className="icon active" onClick={() => router.push('/profile')}>
                    <img src="/images/icons/icon1.png" alt="Profile" />
                </button>
                <button className="icon" onClick={() => router.push('/history')}>
                    <img src="/images/icons/icon2.png" alt="History" />
                </button>
            </aside>

            {/* Main Content */}
            <main className="mainContent">
                {/* Middle Section */}
                <div className="middleSection">
                    {/* Gradient Color Bar */}
                    <div className="colorBar"></div>

                    <div className="contentBody">
                        <h1 className="welcomeMessage">Welcome, Amanda</h1>
                        <p className="date">{currentDate}</p>

                        {/* Profile Info Section */}
                        <div className="profileInfo">
                            <img
                                src="/images/ToBeDelete/portrait.png"
                                alt="Profile"
                                className="profileImage"
                            />
                            <div className="userInfo">
                                <h2 className="profileName">Amanda Rawles</h2>
                                <Link href="/profile" className="profileEmail">
                                    amandarawles@gmail.com
                                </Link>
                            </div>
                            <button className="editButton" onClick={handleEditClick}>
                                {isEditing ? "Save" : "Edit"}
                            </button>
                        </div>

                        {/* Editable Fields */}
                        <div className="editFields">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="fieldLabel">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your First Name"
                                        className="inputField"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="fieldLabel">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Nick Name"
                                        className="inputField"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="fieldLabel">Gender</label>
                                    <input
                                        type="text"
                                        placeholder="Your Gender"
                                        className="inputField"
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="fieldLabel">Country</label>
                                    <input
                                        type="text"
                                        placeholder="Your Country"
                                        className="inputField"
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="emailSection">
                            <h3 className="emailTitle">My Email Address</h3>
                            <div className="emailInfo">
                                <span className="emailIcon">📧</span>
                                <span className="emailText">amandarawles@gmail.com</span>
                                <span className="emailTimestamp">1 month ago</span>
                            </div>
                            <button className="changeEmailButton" onClick={handleChangeEmailClick}>Change Email Address</button>
                        </div>
                    </div>
                </div>

                {/* Change Email Modal */}
                {isModalOpen && (
                    <div className="modalOverlay">
                        <div className="modal">
                            <h2>Change Email</h2>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Enter your new email address"
                                className="inputField"
                            />
                            <button onClick={handleSaveEmail} className="saveButton">Save</button>
                            <button onClick={() => setIsModalOpen(false)} className="cancelButton">Cancel</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProfileCard;