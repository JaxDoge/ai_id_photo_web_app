// src/app/profile/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./profilePage.css";
import NavigationBar from "../NavigationBar/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [gender, setGender] = useState("female");

    useEffect(() => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString("en-US", options);
        setCurrentDate(formattedDate);
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="profilePageWrapper">
            <aside className="leftSidebar">
                <button className="icon" onClick={() => router.push('/generator')}>
                    <i className="fas fa-house" />
                </button>
                <button className="icon active" onClick={() => router.push('/profile')}>
                    <i className="fa-solid fa-grip" />
                </button>
                <button className="icon" onClick={() => router.push('/history')}>
                    <i className="fas fa-file-alt" />
                </button>
            </aside>

            <div className="profileContent">
                <header className="pageHeader">
                    <h1 className="welcomeMessage">Welcome, Amanda</h1>
                    <p className="date">{currentDate}</p>
                </header>

                <main className="profileContainer">
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
                                    <h2 className="profileName">Amanda Rawles</h2>
                                    <Link href="/profile" className="profileEmail">
                                        amandarawles@gmail.com
                                    </Link>
                                </div>
                                <button className="editButton" onClick={handleEditClick}>
                                    {isEditing ? "Save" : "Edit"}
                                </button>
                            </div>

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
                                        <select
                                            className="inputField genderSelect"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            disabled={!isEditing}
                                        >
                                            <option value="female">Female</option>
                                            <option value="male">Male</option>
                                        </select>
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
                                    <div className="col-span-2">
                                        <label className="fieldLabel">My Email Address</label>
                                        <input
                                            type="text"
                                            placeholder="Your Email Address"
                                            className="inputField"
                                            defaultValue="amandarawles@gmail.com"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}