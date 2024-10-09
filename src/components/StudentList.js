// StudentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = ({ onEdit, onDelete }) => {
  const [students, setStudents] = useState([]);

  // Fetch all students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div>
      <h2>Students List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Course</th>
            <th>Erasmus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              {/* Assuming first_name and last_name are strings */}
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.birth_date}</td>
              <td>{student.course}</td>
              <td>{student.is_erasmus ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => onEdit(student)}>Edit</button>
                <button onClick={() => onDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
