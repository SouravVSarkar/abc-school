import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import Register from "../Student/RegisterStudent";
function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2>ABC Primary School</h2>

        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Admission</a></li>
          <li><a href="#">Notice</a></li>
          
          <li><a href="#">Contact</a></li>
          <li>
      <Link to="/admin">Administrative Login</Link>
    </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to ABC Primary School</h1>

        <p>
          Providing quality education and building a bright future for every
          student.
        </p>

        <Link to="/Register">
  Apply Now
</Link>
      </section>

      {/* Features */}
      <section className="features">
        <div className="card">
          <h3>Qualified Teachers</h3>
          <p>Experienced and dedicated teaching staff.</p>
        </div>

        <div className="card">
          <h3>Modern Classrooms</h3>
          <p>Interactive and comfortable learning environment.</p>
        </div>

        <div className="card">
          <h3>Sports & Activities</h3>
          <p>Overall development through extracurricular activities.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 ABC Primary School. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;