import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    courseType: "",
    entryType: "",
    totalIntake: "",
    departmentId: "",
    academicYearId: "",
  });

  // ================= FETCH DATA =================

  const fetchPrograms = async () => {
    const res = await axiosInstance.get("/program");
    if (res.data.success) setPrograms(res.data.data);
  };

  const fetchDepartments = async () => {
    const res = await axiosInstance.get("/department");
    if (res.data.success) setDepartments(res.data.data);
  };

  const fetchAcademicYears = async () => {
    const res = await axiosInstance.get("/academic-year");
    if (res.data.success) setAcademicYears(res.data.data);
  };

  useEffect(() => {
    const init = async () => {
      await fetchPrograms();
      await fetchDepartments();
      await fetchAcademicYears();
      setLoading(false);
    };
    init();
  }, []);

  // ================= CREATE =================

  const handleCreateProgram = async (e) => {
    e.preventDefault();

    const res = await axiosInstance.post("/program", {
      name: formData.name,
      courseType: formData.courseType,
      entryType: formData.entryType,
      totalIntake: Number(formData.totalIntake),
      departmentId: Number(formData.departmentId),
      academicYearId: Number(formData.academicYearId),
    });

    if (res.data.success) {
      setPrograms((prev) => [...prev, res.data.data]);
      setShowModal(false);

      setFormData({
        name: "",
        courseType: "",
        entryType: "",
        totalIntake: "",
        departmentId: "",
        academicYearId: "",
      });
    } else {
      alert(res.data.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Programs</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Program
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded">
        {programs.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No programs found
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Course Type</th>
                <th className="p-4">Entry Type</th>
                <th className="p-4">Intake</th>
                <th className="p-4">Department</th>
                <th className="p-4">Academic Year</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-4">{p.name}</td>
                  <td className="p-4">{p.courseType}</td>
                  <td className="p-4">{p.entryType}</td>
                  <td className="p-4">{p.totalIntake}</td>
                  <td className="p-4">{p.Department?.name || "-"}</td>
                  <td className="p-4">{p.AcademicYear?.year || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-semibold mb-4">Add Program</h3>

            <form onSubmit={handleCreateProgram} className="space-y-3">

              <input
                type="text"
                placeholder="Program Name"
                className="w-full border p-2 rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              {/* Course Type */}
              <select
                className="w-full border p-2 rounded"
                value={formData.courseType}
                onChange={(e) =>
                  setFormData({ ...formData, courseType: e.target.value })
                }
                required
              >
                <option value="">Select Course Type</option>
                <option value="UG">Undergraduate (UG)</option>
                <option value="PG">Postgraduate (PG)</option>
              </select>

              {/* Entry Type */}
              <select
                className="w-full border p-2 rounded"
                value={formData.entryType}
                onChange={(e) =>
                  setFormData({ ...formData, entryType: e.target.value })
                }
                required
              >
                <option value="">Select Entry Type</option>
                <option value="REGULAR">Regular</option>
                <option value="LATERAL">Lateral</option>
              </select>

              {/* Intake */}
              <input
                type="number"
                placeholder="Total Intake"
                className="w-full border p-2 rounded"
                value={formData.totalIntake}
                onChange={(e) =>
                  setFormData({ ...formData, totalIntake: e.target.value })
                }
                required
              />

              {/* Department */}
              <select
                className="w-full border p-2 rounded"
                value={formData.departmentId}
                onChange={(e) =>
                  setFormData({ ...formData, departmentId: e.target.value })
                }
                required
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              {/* Academic Year */}
              <select
                className="w-full border p-2 rounded"
                value={formData.academicYearId}
                onChange={(e) =>
                  setFormData({ ...formData, academicYearId: e.target.value })
                }
                required
              >
                <option value="">Select Academic Year</option>
                {academicYears.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.year} {a.isActive ? "(Active)" : ""}
                  </option>
                ))}
              </select>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
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

export default Program;