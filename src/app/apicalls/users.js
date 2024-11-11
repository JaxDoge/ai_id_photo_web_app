import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

// Helper function to get the token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");

// Function to handle user sign-in
export const signInUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signin`, {
      email,
      password,
    });

    // the backend returns the token in response.data.token
    const token = response.data.token;

    // Store the token in localStorage
    localStorage.setItem("authToken", token);

    return response.data; // Return user data, token, or other relevant info
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error.response ? error.response.data : error;
  }
};

// Function to handle user sign-up
export const signUpUser = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signup`, {
      firstName,
      lastName,
      email,
      password,
    });

    // if the backend returns a token on sign-up, store it
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data; // Return the new user data or token
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error.response ? error.response.data : error;
  }
};

// Function to get details of the logged-in user
export const getLoggedInUserDetails = async () => {
  try {
    const token = getAuthToken();

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_BASE_URL}/users/get-logged-in-user`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach JWT token in Authorization header
      },
    });

    return response.data; // Return the user's details
  } catch (error) {
    console.error("Error fetching logged-in user details:", error);
    throw error.response ? error.response.data : error;
  }
};
