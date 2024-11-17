// src/app/profile/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./profilePage.css";
import NavigationBar from "../NavigationBar/navigation";
import { getLoggedInUserDetails, signoutUser, updateUser } from "../../app/apicalls/users.js"; // 引入 API 方法
import { fetchHistoryPhotosById } from "../../app/apicalls/history.js"; // 引入 fetchHistoryPhotosById
import { sign } from "crypto";

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
    }); // 存储用户信息

    const [updatedUser, setUpdatedUser] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        country: ""
    });

    const [avatarUrl, setAvatarUrl] = useState("");

    // Load avatar URL on mount
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const avatarResponse = await getLoggedInUserDetails();
                console.log("Avatar response:", avatarResponse);
                if (avatarResponse && avatarResponse.data && avatarResponse.data.avatar) {
                    setAvatarUrl(avatarResponse.data.avatar); // Set the avatar URL
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchAvatar();
    }, []);

    useEffect(() => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString("en-US", options);
        setCurrentDate(formattedDate);

        // 获取用户数据和照片
        const fetchUserData = async () => {
            try {
                // 获取用户详细信息
                const response = await getLoggedInUserDetails();
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

                // 获取用户的照片历史
                const photosResponse = await fetchHistoryPhotosById();
                const photos = photosResponse.data;

                // 如果有照片，使用最新的照片作为头像
                if (photos && photos.length > 0) {
                    // 假设最新的照片在数组的第一个位置
                    const latestPhoto = photos[0];
                    setUserData(prevData => ({
                        ...prevData,
                        avatar: latestPhoto.url
                    }));
                } else {
                    // 如果没有照片，使用默认头像
                    setUserData(prevData => ({
                        ...prevData,
                        avatar: "../../images/exampleImage/avatar.png"
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch user details or photos:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = () => {
        if (isEditing) {
            // 保存时发送请求到后端
            handleSave();
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            const response = await updateUser(updatedUser); // 调用 API 更新用户信息
            console.log("User updated successfully:", response);
            // 更新用户数据
            setUserData(prevData => ({
                ...prevData,
                ...updatedUser
            }));
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user:", error);
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
                                    src={avatarUrl || "../../images/exampleImage/avatar.png"}
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
                    <div>
                    <button className="signout" onClick={handleSignout}>
                        <p>Signout</p>
                    </button>
                    </div>
                </main>
            </div>
    );
}