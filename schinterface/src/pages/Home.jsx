import React from "react";
import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();

  return (
    <div>

      {/* Navbar */}
      <nav className="navbar">

        <h2>Little Stars Academy</h2>

        <ul className="nav-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/admission">Admission</Link>
          </li>

          <li>
            <Link to="/notice">Notice</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <li>
            <Link to="/admin">
              Administrative Login
            </Link>
          </li>

        </ul>

      </nav>


      {/* Hero Section */}
      <section className="hero">

        <h1>
          Welcome to ABC Primary School
        </h1>

        <p>
          Providing quality education and building a bright
          future for every student.
        </p>


        {/* Admission */}
        <Link to="/Register">
          Apply Now
        </Link>


        {/* Download Exam Admit */}
        <button
          onClick={() => navigate("/download-admit")}
        >
          Download Admit For Exam
        </button>

      </section>


      {/* Features */}
      <section className="features">

        <div className="card">

          <h3>
            Qualified Teachers
          </h3>

          <p>
            Experienced and dedicated teaching staff.
          </p>

        </div>


        <div className="card">

          <h3>
            Modern Classrooms
          </h3>

          <p>
            Interactive and comfortable learning environment.
          </p>

        </div>


        <div className="card">

          <h3>
            Sports & Activities
          </h3>

          <p>
            Overall development through extracurricular
            activities.
          </p>

        </div>

      </section>


      {/* Footer */}
      <footer className="footer">

        <p>
          © 2026 ABC Primary School. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;