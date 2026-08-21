import { useState } from "react";

function StudentSearch() {
  const [studentClass, setStudentClass] = useState("");
  const [Registration, setRegistration] = useState("");
  const [StudentRoll, setStudentRoll]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if( !studentClass || (!StudentRoll && !Registration)) {
      alert("Enter Class and Roll or Registraton")
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/auth/viewstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class: studentClass,
          StudentRoll:StudentRoll,
          Registration: Registration
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert("Data received successfully!");
      } else {
        alert(data.message || "Student not found");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      

      <form onSubmit={handleSubmit}>
      
        <div style={{ marginBottom: "15px" }}>
          <label>Class</label>
          <br />
          <select
            type="text"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            placeholder="Enter Class"
           
            style={{ width: "100%", padding: "8px" }}
          >

            <option value="">Select</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          <option value="2">Class 3</option>
          <option value="2">Class 4</option>

          </select>
        </div> 

        <div style={{ marginBottom: "15px" }}>
          <label>Roll</label>
          <br />
          <input
            type="text"
            value={StudentRoll}
            
            onChange={(e)=> setStudentRoll(e.target.value)}
            placeholder="Enter Roll"
          
            style={{ width: "100%", padding: "8px" }}
          />

          

          
        </div>
            <h3>OR</h3>

        <div style={{ marginBottom: "15px" }}>
          <label>Registration</label>
          <br />
          <input
            type="text"
            value={Registration}
            onChange={(e) => setRegistration(e.target.value)}
            placeholder="Registration"

            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default StudentSearch;