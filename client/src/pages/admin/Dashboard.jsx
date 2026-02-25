import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    institutions: 0,
    campuses: 0,
    departments: 0,
    programs: 0,
    applicants: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [
        instRes,
        campusRes,
        deptRes,
        progRes,
        applicantRes,
        userRes,
      ] = await Promise.all([
        axiosInstance.get("/institution"),
        axiosInstance.get("/campus"),
        axiosInstance.get("/department"),
        axiosInstance.get("/program"),
        axiosInstance.get("/applicant"),
        axiosInstance.get("/user"),
      ]);

      setStats({
        institutions: instRes.data?.data?.length || 0,
        campuses: campusRes.data?.data?.length || 0,
        departments: deptRes.data?.data?.length || 0,
        programs: progRes.data?.data?.length || 0,
        applicants: applicantRes.data?.data?.length || 0,
        users: userRes.data?.data?.length || 0,
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const Card = ({ title, value }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200">
      <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );

  if (loading) {
    return <div className="text-gray-600">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Overview of your admission system
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/institutions"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Institution
        </Link>

        <Link
          to="/campuses"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Add Campus
        </Link>

        <Link
          to="/departments"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          + Add Department
        </Link>

        <Link
          to="/programs"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Program
        </Link>

        <Link
          to="/applicants"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
        >
          + Add Applicant
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Institutions" value={stats.institutions} />
        <Card title="Campuses" value={stats.campuses} />
        <Card title="Departments" value={stats.departments} />
        <Card title="Programs" value={stats.programs} />
        <Card title="Applicants" value={stats.applicants} />
        <Card title="Users" value={stats.users} />
      </div>
    </div>
  );
};

export default Dashboard;