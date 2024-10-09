// AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = ({ onAdd }) => {
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [birthDate, setBirthDate] = useState('');
  const [course, setCourse] = useState('');
  const [isErasmus, setIsErasmus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      course: parseInt(course),
      is_erasmus: isErasmus,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/students`, newStudent);
      onAdd(); // Callback to refresh student list
      setFirstName('');
      setLastName('');
      setBirthDate('');
      setCourse('');
      setIsErasmus(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Birth Date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        required
      />
      <label>
        Erasmus:
        <input
          type="checkbox"
          checked={isErasmus}
          onChange={(e) => setIsErasmus(e.target.checked)}
        />
      </label>
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudent;
