// EditStudent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudent = ({ student, onUpdate }) => {
  const [firstName, setFirstName] = useState('');
  const [course, setCourse] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isErasmus, setIsErasmus] = useState(false);

  useEffect(() => {
    if (student) {
      setFirstName(student.first_name.join(', '));
      setLastName(student.last_name.join(', '));
      setBirthDate(student.birth_date);
      setCourse(student.course);
      setIsErasmus(student.is_erasmus);
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStudent = {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      course: parseInt(course),
      is_erasmus: isErasmus,
    };

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/students/${student.id}`, updatedStudent);;
      onUpdate();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  if (!student) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>
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
      <button type="submit">Update Student</button>
    </form>
  );
};

export default EditStudent;
