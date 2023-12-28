import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import CreateCourseForm from "../CreateCourseForm";
import CourseList from "../CourseList";
import axios from "axios";

export default function AdminPage() {
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [isHomeOpen, setHomeOpen] = useState(true);
  const [courses, setCourses] = useState([]);

  const openHomeContainer = () => {
    setHomeOpen(true);
    setCreateFormOpen(false);
  };

  const openCreateForm = () => {
    setCreateFormOpen(true);
    setHomeOpen(false);
  };

  const closeCreateForm = () => {
    setCreateFormOpen(false);
  };

  const handleCreateCourse = async (courseData) => {
    console.log("Creating course with data:", courseData);
    setCourses([...courses, courseData]);
    closeCreateForm();
    setHomeOpen(true);
  };

  useEffect(() => {
    // Fetch courses when the component mounts
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/courses");
      const fetchedCourses = response.data;
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      // Implement the delete functionality
      await axios.delete(`http://localhost:3000/courses/${courseId}`);

      // Update the course list immediately after deletion
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div id="admin-section">
      <Sidebar onCreateClick={openCreateForm} onHomeClick={openHomeContainer} />
      {isCreateFormOpen && (
        <CreateCourseForm
          onClose={closeCreateForm}
          onCreate={handleCreateCourse}
        />
      )}
      {isHomeOpen && (
        <CourseList courses={courses} onDelete={handleDeleteCourse} />
      )}
    </div>
  );
}
