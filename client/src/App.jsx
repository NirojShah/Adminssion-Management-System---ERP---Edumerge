import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Register";
import Dashboard from "./pages/admin/Dashboard";
import Applicants from "./pages/admin/Applicants";
import AdmissionForm from "./pages/admin/Admissions";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import Program from "./pages/program/Program";
import Campus from "./pages/campus/Campus";
import Institution from "./pages/institution/Institution";
import Department from "./pages/department/department";
import AcademicYearPage from "./pages/admin/AcademicYear";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/admission-form" element={<AdmissionForm />} />
          <Route path="/programs" element={<Program />} />
          <Route path="/campus" element={<Campus />} />
          <Route path="/institution" element={<Institution />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/academicyear" element={<AcademicYearPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;