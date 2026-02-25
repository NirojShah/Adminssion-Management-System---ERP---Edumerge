import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const Institution = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    institutionCapLimit: "",
  });

  const fetchInstitutions = async () => {
    try {
      const response = await axiosInstance.get("/institution");
      if (response.data.success) {
        setInstitutions(response.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/institution", {
        ...formData,
        institutionCapLimit: Number(formData.institutionCapLimit),
      });

      if (response.data.success) {
        setInstitutions((prev) => [...prev, response.data.data]);
        setShowModal(false);
        setFormData({ name: "", code: "", institutionCapLimit: "" });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create institution");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Institutions</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Institution
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        {institutions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No institutions found
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Code</th>
                <th className="p-4">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map((inst) => (
                <tr key={inst.id} className="border-b">
                  <td className="p-4">{inst.id}</td>
                  <td className="p-4">{inst.name}</td>
                  <td className="p-4">{inst.code}</td>
                  <td className="p-4">{inst.institutionCapLimit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-semibold mb-4">Add Institution</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Code"
                className="w-full p-2 border rounded"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Capacity Limit"
                className="w-full p-2 border rounded"
                value={formData.institutionCapLimit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    institutionCapLimit: e.target.value,
                  })
                }
              />

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

export default Institution;