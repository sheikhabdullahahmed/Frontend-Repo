import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.imageUrl; // return URL for later use
  } catch (error) {
    console.error("Error uploading the image:", error.message);
    // throw error;
  }
};

export default uploadImage;
