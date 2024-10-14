import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = ({ onEdit, onDelete }) => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState(''); 

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`, {
          params: { search }
        });
        setStudents(response.data);  
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();  
  }, [search]);  

  return (
    <div>
      <h2>Students List</h2>
      
      {}
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}  
        />
      </div>

      {}
      <table>
        <thead>
          <tr>
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
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{new Date(student.birth_date).toLocaleDateString('en-CA')}</td>
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
