import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import StudentApplication from "./pages/Application";
import RegisterStudent from "./Student/RegisterStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/application" element={<StudentApplication />} />
        <Route path="/register-student" element={<RegisterStudent />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;