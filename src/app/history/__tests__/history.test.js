import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserProfileHistoryPage from "../page";
import { getLoggedInUserDetails } from "../../apicalls/users";
import { fetchHistoryPhotosById } from "../../apicalls/history";
import { saveAs } from "file-saver";
import JSZip from "jszip";

// Mock API calls
jest.mock("../../apicalls/users", () => ({
  getLoggedInUserDetails: jest.fn(),
}));
jest.mock("../../apicalls/history", () => ({
  fetchHistoryPhotosById: jest.fn(),
}));
jest.mock("file-saver", () => ({
  saveAs: jest.fn(),
}));
jest.mock("jszip");

describe("UserProfileHistoryPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component correctly", async () => {
    // Mock API responses
    getLoggedInUserDetails.mockResolvedValue({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    });
    fetchHistoryPhotosById.mockResolvedValue({
      data: [
        { url: "http://example.com/photo1.jpg" },
        { url: "http://example.com/photo2.jpg" },
      ],
    });

    render(<UserProfileHistoryPage />);

    // Check if user details are rendered
    expect(await screen.findByText(/Welcome, John/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/john.doe@example.com/i)
    ).toBeInTheDocument();

    // Check if photos are rendered
    expect(await screen.findByAltText(/Photo 1/i)).toBeInTheDocument();
    expect(await screen.findByAltText(/Photo 2/i)).toBeInTheDocument();
  });

  it("displays 'No photos' when there are no photos", async () => {
    // Mock API responses
    getLoggedInUserDetails.mockResolvedValue({
      data: {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
      },
    });
    fetchHistoryPhotosById.mockResolvedValue({ data: [] });

    render(<UserProfileHistoryPage />);

    // Check if "No photos" is displayed
    expect(await screen.findByText(/No photos/i)).toBeInTheDocument();
  });

  it("handles image download correctly", async () => {
    // Mock `fetch`
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        blob: () => Promise.resolve(new Blob(["image data"])),
      })
    );
    // Mock API responses
    getLoggedInUserDetails.mockResolvedValue({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    });

    getLoggedInUserDetails.mockResolvedValue({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    });

    fetchHistoryPhotosById.mockResolvedValue({
      data: [{ url: "http://example.com/photo1.jpg" }],
    });

    render(<UserProfileHistoryPage />);

    // Wait for the photo to load
    const photoElement = await screen.findByAltText(/Photo 1/i);
    expect(photoElement).toBeInTheDocument();

    // Simulate clicking the download icon
    const downloadIcon = photoElement.nextSibling.querySelector(".faDownload");
    expect(downloadIcon).toBeInTheDocument();
    fireEvent.click(downloadIcon);

    // Check if the download function is called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("http://localhost:4000/photo/proxy")
      );
    });
  });

  it("handles avatar loading correctly", async () => {
    // Mock API responses
    getLoggedInUserDetails.mockResolvedValue({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        avatar: "http://example.com/avatar.jpg",
      },
    });

    render(<UserProfileHistoryPage />);

    // Check if the avatar image is rendered
    const avatarImage = await screen.findByAltText(/avatar/i);
    expect(avatarImage).toHaveAttribute(
      "src",
      "/images/exampleImage/avatar.png"
    );
  });

  it("handles avatar fallback", async () => {
    // Mock API responses
    getLoggedInUserDetails.mockResolvedValue({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
    });

    render(<UserProfileHistoryPage />);

    // Check if the default avatar is used
    const avatarImage = await screen.findByAltText(/avatar/i);
    expect(avatarImage).toHaveAttribute(
      "src",
      "/images/exampleImage/avatar.png"
    );
  });
});
