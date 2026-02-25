import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const Campus = () => {
  const [campuses, setCampuses] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    institutionId: "",
  });

  const fetchData = async () => {
    const campusRes = await axiosInstance.get("/campus");
    const instRes = await axiosInstance.get("/institution");

    if (campusRes.data.success) setCampuses(campusRes.data.data);
    if (instRes.data.success) setInstitutions(instRes.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const response = await axiosInstance.post("/campus", {
      name: formData.name,
      institutionId: Number(formData.institutionId),
    });

    if (response.data.success) {
      setCampuses((prev) => [...prev, response.data.data]);
      setShowModal(false);
      setFormData({ name: "", institutionId: "" });
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Campuses</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Campus
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Institution</th>
            </tr>
          </thead>
          <tbody>
            {campuses.map((campus) => (
              <tr key={campus.id} className="border-b">
                <td className="p-4">{campus.id}</td>
                <td className="p-4">{campus.name}</td>
                <td className="p-4">
                  {campus.Institution?.name || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="mb-4 font-semibold">Add Campus</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                placeholder="Campus Name"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <select
                className="w-full p-2 border rounded"
                value={formData.institutionId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    institutionId: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Institution</option>
                {institutions.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name}
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

export default Campus;