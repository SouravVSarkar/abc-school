import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import StudentApplication from "./pages/Application";
import RegisterStudent from "./Student/RegisterStudent";
import StudentSearch from "./Student/ViewProfile";
import CreateExam from "./Student/UpdateExamSchedule";
import AdminResult from "./Student/Result";
import DownloadExam from "./pages/Admit_download";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/application" element={<StudentApplication />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/view-profile" element={<StudentSearch />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/student-result" element={<AdminResult />} />
        <Route path="/download-admit" element={<DownloadExam />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;