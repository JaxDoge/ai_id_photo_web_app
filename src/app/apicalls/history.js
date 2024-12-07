import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL || "http://localhost:4000";

const getAuthToken = () => localStorage.getItem("authToken");

export const fetchHistoryPhotosById = async () => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }
        const response = await axios.get(`${API_BASE_URL}/users/get-photo-history`, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach JWT token in Authorization header
            },
        });
        console.log("Fetched history photos:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching history photos:", error);
        throw error.response ? error.response.data : error;
    }
};

// Deleting a photo
export const deletePhotoByURL = async (photo) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }
        const deleteUrl = API_BASE_URL + "/users/delete-single-photo?url=" + encodeURIComponent(photo.url);
        const response = await axios.delete(deleteUrl, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach JWT token in Authorization header
            },
        });
        console.log("Deleted photo by URL:", response.data);
        return response.data.photo;
    } catch (error) {
        console.error("Error deleting photo by URL:", error);
        throw error.response ? error.response.data : error;
    }
}