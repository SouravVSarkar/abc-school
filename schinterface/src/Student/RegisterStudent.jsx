import { useState } from "react";
import axios from "axios";

function RegisterStudent() {
  const [formData, setFormData] = useState({
    studentName: "",
    fathersname: "",
    mothersname: "",
    gender: "",
    studentClass: "",
    rollNo: "",
    registration: "",
    dob: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "`${import.meta.env.VITE_API_URL}/api/auth/registration`,",
        formData
      );

      alert(response.data.message || "Student Registered Successfully");

      // Clear the form
      setFormData({
        studentName: "",
        fathersname: "",
        mothersname: "",
        gender: "",
        studentClass: "",
        rollNo: "",
        registration: "",
        dob: "",
        mobile: "",
        address: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "30px auto",
        padding: "25px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Student Registration</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="fathersname"
          placeholder="Father's Name"
          value={formData.fathersname}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="mothersname"
          placeholder="Mother's Name"
          value={formData.mothersname}
          onChange={handleChange}
          required
        />
        <br /><br />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <br /><br />

        <input
          type="number"
          name="studentClass"
          placeholder="Class"
          value={formData.studentClass}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="rollNo"
          placeholder="Roll Number"
          value={formData.rollNo}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="registration"
          placeholder="Registration Number"
          value={formData.registration}
          onChange={handleChange}
          required
        />
        <br /><br />

        <label>Date of Birth</label>
        <br />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="address"
          placeholder="Address"
          rows="4"
          value={formData.address}
          onChange={handleChange}
        />

        <br /><br />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Register Student
        </button>

      </form>
    </div>
  );
}

export default RegisterStudent;