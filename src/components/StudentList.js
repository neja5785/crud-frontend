import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = ({ onEdit, onDelete }) => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');  // For search query

  // Fetch all students or filtered students when the component mounts or search query changes
  useEffect(() => {
    console.log('Search query updated:', search);  // Debug: Log the search query

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`, {
          params: { search }
        });
        console.log('Students fetched from backend:', response.data);  // Debug: Log backend response
        setStudents(response.data);  // Set the filtered students
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();  // Call the function inside useEffect
  }, [search]);  // Re-run the effect whenever `search` changes

  return (
    <div>
      <h2>Students List</h2>
      
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}  // Update search state when typing
        />
      </div>

      {/* Students Table */}
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
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
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
            ))
          ) : (
            <tr>
              <td colSpan="7">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
