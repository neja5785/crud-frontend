import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = ({ onAdd }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [course, setCourse] = useState('');
  const [isErasmus, setIsErasmus] = useState(false);
  const [errors, setErrors] = useState({});  
  const [backendErrors, setBackendErrors] = useState([]); 
  const today = new Date().toISOString().split('T')[0];  

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
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
    if (birthDate && (birthDateObject > new Date())) {
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

    const newStudent = {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      course: parseInt(course),
      is_erasmus: isErasmus,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/students`, newStudent);
      onAdd();
      setFirstName('');
      setLastName('');
      setBirthDate('');
      setCourse('');
      setIsErasmus(false);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setBackendErrors(error.response.data.errors);  
      } else {
        console.error('Error adding student:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder="Birth Date"
          min="1900-01-01"
          max={today}
        />
        {errors.birthDate && <span className="error">{errors.birthDate}</span>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        {errors.course && <span className="error">{errors.course}</span>}
      </div>

      <div>
        <label>
          Erasmus:
          <input
            type="checkbox"
            checked={isErasmus}
            onChange={(e) => setIsErasmus(e.target.checked)}
          />
        </label>
      </div>

      {}
      {backendErrors.length > 0 && (
        <div className="backend-errors">
          {backendErrors.map((err, index) => (
            <p key={index} className="error">{err}</p>
          ))}
        </div>
      )}

      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudent;
