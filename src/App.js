// src/App.js
import React, { useState } from 'react';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleDeleteStudent = async (studentId) => {
    await fetch(`${process.env.REACT_APP_API_URL}/students/${studentId}`, {
      method: 'DELETE',
    });
    // Refresh the page or update state to remove deleted student
    window.location.reload(); // This will refresh the page and show the updated list
  };

  return (
    <div className="App">
      <AddStudent onAdd={() => window.location.reload()} /> {/* Reload after adding */}
      <StudentList onEdit={handleEditStudent} onDelete={handleDeleteStudent} />
      {editingStudent && <EditStudent student={editingStudent} onUpdate={() => window.location.reload()} />}
    </div>
  );
}

export default App;
