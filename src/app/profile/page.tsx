// src/app/profile/page.tsx 

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./profilePage.css";
import NavigationBar from "../NavigationBar/navigation";
import { getLoggedInUserDetails, updateUser, signoutUser} from "../apicalls/users"; // Adjusted import path
import { fetchHistoryPhotosById } from "../apicalls/history"; // Adjusted import path

export default function ProfilePage() {
    const BASE_API = process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL || "http://localhost:4000";
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
        gender: "",
        country: ""
    });

    const [updatedUser, setUpdatedUser] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        country: ""
    });

    useEffect(() => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString("en-US", options);
        setCurrentDate(formattedDate);

        // Fetch user data and photos
        const fetchUserData = async () => {
            try {
                // Get user details
                const response = await getLoggedInUserDetails();
                if (response.success) {
                    const user = response.data;
                    setUserData(prevData => ({
                        ...prevData,
                        ...user
                    }));
                    setUpdatedUser({
                        firstName: user.firstName || "",
                        lastName: user.lastName || "",
                        gender: user.gender || "",
                        country: user.country || "",
                    });
                } else {
                    console.error("Failed to fetch user details:", response.message);
                }
            } catch (error) {
                console.error("Failed to fetch user details or photos:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = () => {
        if (isEditing) {
            // Save changes
            handleSave();
        } else {
            setIsEditing(true);
        }
    };

    const handleCancel = () => {
        // Reset updatedUser to current userData values
        setUpdatedUser({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            gender: userData.gender || "",
            country: userData.country || "",
        });
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            const response = await updateUser(updatedUser);
            if (response.success) {
                console.log("User updated successfully:", response);
                // Update userData with the new information
                setUserData(prevData => ({
                    ...prevData,
                    ...updatedUser
                }));
                setIsEditing(false);
            } else {
                console.error("Failed to update user:", response.message);
                alert("Failed to update profile. Please try again.");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("An error occurred while updating the profile. Please try again.");
        }
    };

    const handleSignout = () => {
        signoutUser();
        router.push("/signIn");
    }

    return (
        <div className="profileContainer">
            <NavigationBar />
            <main className="mainContent">
                <header className="pageHeader">
                    <h1 className="welcomeMessage">Welcome, {userData.firstName || "User"}</h1>
                    <p className="date">{currentDate}</p>
                </header>
                <div className="middleSection">
                    <div className="colorBar"></div>
                    <div className="contentBody">
                        <div className="profileInfo">
                            <img
                                src={"/images/avatar-default.png"}
                                alt="Profile"
                                className="profileImage"
                            />
                            <div className="userInfo">
                                <h2 className="profileName">
                                    {userData.firstName} {userData.lastName}
                                </h2>
                                <Link href="/profile" className="profileEmail">
                                    {userData.email || "user@example.com"}
                                </Link>
                            </div>
                            <button className="editButton" onClick={handleEditClick}>
                                {isEditing ? "Save" : "Edit"}
                            </button>
                            {isEditing && (
                                <button className="cancelButton" onClick={handleCancel}>
                                    Cancel
                                </button>
                            )}
                        </div>

                        <div className="editFields">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="fieldLabel">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your First Name"
                                        className="inputField"
                                        value={updatedUser.firstName}
                                        onChange={(e) =>
                                            setUpdatedUser({ ...updatedUser, firstName: e.target.value })
                                        }
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="fieldLabel">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Last Name"
                                        className="inputField"
                                        value={updatedUser.lastName}
                                        onChange={(e) =>
                                            setUpdatedUser({ ...updatedUser, lastName: e.target.value })
                                        }
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="fieldLabel">Gender</label>
                                    <select
                                        className="inputField genderSelect"
                                        value={updatedUser.gender}
                                        onChange={(e) =>
                                            setUpdatedUser({ ...updatedUser, gender: e.target.value })
                                        }
                                        disabled={!isEditing}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="fieldLabel">Country</label>
                                    <input
                                        type="text"
                                        placeholder="Your Country"
                                        className="inputField"
                                        value={updatedUser.country}
                                        onChange={(e) =>
                                            setUpdatedUser({ ...updatedUser, country: e.target.value })
                                        }
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="fieldLabel">Email Address</label>
                                    <input
                                        type="text"
                                        placeholder="Your Email Address"
                                        className="inputField"
                                        value={userData.email}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="signout" onClick={handleSignout}>
                    <p>Signout</p>
                </button>
            </main>
        </div>
    );
}