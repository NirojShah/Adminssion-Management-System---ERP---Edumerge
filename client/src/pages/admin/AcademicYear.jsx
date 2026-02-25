import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AcademicYearPage = () => {
  const [year, setYear] = useState("");
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAcademicYears = async () => {
    try {
      const res = await axios.get("/academic-year");
      setAcademicYears(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!year.trim()) return;

    try {
      setLoading(true);
      await axios.post("/academic-year", { year });
      setYear("");
      fetchAcademicYears();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (id) => {
    try {
      await axios.patch(`/academic-year/${id}/activate`);
      fetchAcademicYears();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAcademicYears();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Academic Years
        </h1>

        {/* Create Card */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Create Academic Year</h2>

          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              placeholder="2024-2025"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-3">Year</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {academicYears.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No Academic Years Found
                  </td>
                </tr>
              ) : (
                academicYears.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.year}
                    </td>

                    <td className="px-6 py-4">
                      {item.isActive ? (
                        <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-200 rounded-full">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {!item.isActive && (
                        <button
                          onClick={() => handleActivate(item.id)}
                          className="px-4 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm transition"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AcademicYearPage;