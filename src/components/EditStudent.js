import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudent = ({ student, onUpdate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [course, setCourse] = useState('');
  const [isErasmus, setIsErasmus] = useState(false);
  const [errors, setErrors] = useState({}); 
  const [backendErrors, setBackendErrors] = useState([]);  

  useEffect(() => {
    if (student) {
      setFirstName(student.first_name);
      setLastName(student.last_name);
      const formattedBirthDate = student.birth_date ? student.birth_date.split('T')[0] : '';
      setBirthDate(formattedBirthDate);
      setCourse(student.course);
      setIsErasmus(student.is_erasmus);
    }
  }, [student]);

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const today = new Date();
    const minDate = new Date('1900-01-01');

    
    if (firstName.length > 40) {
      errors.firstName = 'First name cannot exceed 40 characters';
    } else if (firstName && !nameRegex.test(firstName)) {
      errors.firstName = 'First name must contain only letters';
    }

    
    if (lastName.length > 40) {
      errors.lastName = 'Last name cannot exceed 40 characters';
    } else if (lastName && !nameRegex.test(lastName)) {
      errors.lastName = 'Last name must contain only letters';
    }

    
    const birthDateObject = new Date(birthDate);
    if (birthDate && (birthDateObject > today)) {
      errors.birthDate = 'Birth date cannot be in the future';
    } else if (birthDate && (birthDateObject < minDate)) {
      errors.birthDate = 'Birth date cannot be before 1900-01-01';
    }

    
    if (!course || isNaN(course) || parseInt(course) < 1) {
      errors.course = 'Course must be a number greater than 0';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setBackendErrors([]);

    
    if (!validateForm()) return;

    const updatedStudent = {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      course: parseInt(course),
      is_erasmus: isErasmus,
    };

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/students/${student.id}`, updatedStudent);
      onUpdate();
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setBackendErrors(error.response.data.errors);  // Display backend validation errors
      } else {
        console.error('Error updating student:', error);
      }
    }
  };

  if (!student) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>
      <div>
        <label>
          First Name:
          <input
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div>
        <label>
          Last Name:
          <input
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div>
        <label>
          Birth Date:
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Birth Date"
            min="1900-01-01"
            max={new Date().toISOString().split('T')[0]}
          />
        </label>
        {errors.birthDate && <span className="error">{errors.birthDate}</span>}
      </div>

      <div>
        <label>
          Course:
          <input
            type="number"
            placeholder="Enter course number"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </label>
        {errors.course && <span className="error">{errors.course}</span>}
      </div>

      <div className="erasmus-container">
        <label>Erasmus:</label>
        <input
          type="checkbox"
          checked={isErasmus}
          onChange={(e) => setIsErasmus(e.target.checked)}
        />
      </div>

      {}
      {backendErrors.length > 0 && (
        <div className="backend-errors">
          {backendErrors.map((err, index) => (
            <p key={index} className="error">{err}</p>
          ))}
        </div>
      )}

      <button type="submit">Update Student</button>
    </form>
  );
};

export default EditStudent;
