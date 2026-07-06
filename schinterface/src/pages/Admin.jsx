import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import Register from "../Student/RegisterStudent"; // Route target component

function AdminDashboard() {
  const navigate = useNavigate();

  const activities = [
    {
      title: "Incoming Application Request",
      description: "View and manage new admission applications.",
    },
    {
      title: "Register A Student",
      description: "This is one time registration for a new student.",
    },
    {
      title: "View Student Profile",
      description: "Search and access student information.",
    },
    {
      title: "Release Notification",
      description: "Publish important notices and announcements.",
    },
    {
      title: "Admit-Exam Activities",
      description: "Generate admit cards and manage examinations.",
    },
    {
      title: "Results",
      description: "Upload and publish student results.",
    },
  ];

  const handleOpen = (title) => {
    switch (title) {
      case "Register A Student":
        navigate("/register-student");
        break;

      default:
        alert(`${title} page is not implemented yet.`);
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>School Administrative Dashboard</h1>
      </header>

      <div className="card-container">
        {activities.map((activity, index) => (
          <div className="card" key={index}>
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
            <button onClick={() => handleOpen(activity.title)}>
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;