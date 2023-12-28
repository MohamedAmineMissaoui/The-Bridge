import React from "react";
import "./CourseList.css";

const CourseList = ({ courses, onDelete }) => {
  return (
    <div className="course-list-container">
      <h1 className="course-list-title">Course List</h1>
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id} className="course-item">
            <div className="course-details">
              <span className="course-title">{course.title}</span>
              <span className="course-price">${course.price}</span>
            </div>
            <div className="course-buttons">
              <button className="edit-button">Edit</button>
              <button
                className="delete-button"
                onClick={() => onDelete(course.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
