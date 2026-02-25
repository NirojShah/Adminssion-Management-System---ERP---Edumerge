import { Link, useNavigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 text-xl font-bold border-b">Admission System</div>

        <nav className="p-4 space-y-3">
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-200">
            Dashboard
          </Link>

          <Link
            to="/applicants"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Applicants
          </Link>

          <Link
            to="/admission-form"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Admission Form
          </Link>

          <Link to="/programs" className="block p-2 rounded hover:bg-gray-200">
            Programs
          </Link>
          <Link to="/campus" className="block p-2 rounded hover:bg-gray-200">
            Campus
          </Link>
          <Link to="/institution" className="block p-2 rounded hover:bg-gray-200">
            Institution
          </Link>
          <Link to="/departments" className="block p-2 rounded hover:bg-gray-200">
            Department
          </Link>
          <Link to="/academicyear" className="block p-2 rounded hover:bg-gray-200">
            Academic year
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-lg">Welcome, {user?.name}</h1>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
