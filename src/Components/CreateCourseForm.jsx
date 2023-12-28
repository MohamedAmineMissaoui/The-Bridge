import React, { useState } from "react";
import axios from "axios";
import './CreateCourseForm.css';

const CreateCourseForm = ({ onClose, onCreate }) => {
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", courseName);
      formData.append("price", price);

      const response = await axios.post(
        "http://localhost:3000/courses",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data);

      // Pass the course data to the callback in AdminPage
      onCreate({
        image: response.data.image,
        title: response.data.title,
        price: response.data.price,
      });

      onClose();
    } catch (error) {
      console.error("Error creating course:", error.message);
    }
  };

  return (
    <div className="create-course-form">
      <h2>Create New Course</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Course Name:
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Upload Image:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourseForm;
