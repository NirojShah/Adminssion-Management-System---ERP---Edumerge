import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    campusId: "",
  });

  // Fetch Departments + Campuses
  const fetchData = async () => {
    try {
      const [deptRes, campusRes] = await Promise.all([
        axiosInstance.get("/department"),
        axiosInstance.get("/campus"),
      ]);

      if (deptRes.data.success) {
        setDepartments(deptRes.data.data);
      }

      if (campusRes.data.success) {
        setCampuses(campusRes.data.data);
      }
    } catch (error) {
      console.error("Department fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create Department
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/department", {
        name: formData.name,
        campusId: Number(formData.campusId),
      });

      if (response.data.success) {
        setDepartments((prev) => [...prev, response.data.data]);
        setShowModal(false);
        setFormData({ name: "", campusId: "" });
      }
    } catch (error) {
      console.error("Create department error:", error);
      alert("Failed to create department");
    }
  };

  if (loading) {
    return <div className="text-gray-600">Loading departments...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Departments</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          + Add Department
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        {departments.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No departments found
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Department Name</th>
                <th className="p-4 text-left">Campus</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} className="border-b">
                  <td className="p-4">{dept.id}</td>
                  <td className="p-4">{dept.name}</td>
                  <td className="p-4">
                    {dept.Campus?.name || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-lg font-semibold mb-4">
              Add Department
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                placeholder="Department Name"
                className="w-full p-2 border rounded-lg"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <select
                className="w-full p-2 border rounded-lg"
                value={formData.campusId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    campusId: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Campus</option>
                {campuses.map((campus) => (
                  <option key={campus.id} value={campus.id}>
                    {campus.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;