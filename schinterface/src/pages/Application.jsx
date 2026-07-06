import React, { useState } from "react";
import "../styles/Application.css";

function StudentApplication() {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    age: "",
    address: "",
    mobileNumber: "",
    emergencyMobileNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Application Submitted Successfully!");
  };

  return (
    <div className="application-container">
      <h1>Student Application Form</h1>

      <form onSubmit={handleSubmit} className="application-form">

        <label>Name</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          required
        />

        <label>Father's Name</label>
        <input
          type="text"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          required
        />

        <label>Mother's Name</label>
        <input
          type="text"
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          required
        />

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="4"
          required
        />

        <label>Mobile Number</label>
        <input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          maxLength="10"
          required
        />

        <label>Emergency Mobile Number</label>
        <input
          type="tel"
          name="emergencyMobileNumber"
          value={formData.emergencyMobileNumber}
          onChange={handleChange}
          maxLength="10"
          required
        />

        <button type="submit">Submit Application</button>

      </form>
    </div>
  );
}

export default StudentApplication;