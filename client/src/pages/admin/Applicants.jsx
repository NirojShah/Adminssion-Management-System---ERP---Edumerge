import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "PENDING",
    programId: "",
  });

  // Fetch applicants
  const fetchApplicants = async () => {
    try {
      const response = await axiosInstance.get("/applicant");
      if (response.data.success) {
        setApplicants(response.data.data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch applicants");
    }
  };

  // Fetch programs
  const fetchPrograms = async () => {
    try {
      const response = await axiosInstance.get("/program");
      if (response.data.success) {
        setPrograms(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchApplicants(), fetchPrograms()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Create applicant
  const handleCreateApplicant = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/applicant", formData);

      if (response.data.success) {
        setApplicants((prev) => [...prev, response.data.data]);
        setShowModal(false);

        setFormData({
          name: "",
          email: "",
          phone: "",
          status: "PENDING",
          programId: "",
        });
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create applicant");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Applicants</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Applicant
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {applicants.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No applicants found
          </div>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Program</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="border-b">
                  <td className="p-4">{applicant.id}</td>
                  <td className="p-4">{applicant.name}</td>
                  <td className="p-4">{applicant.email}</td>
                  <td className="p-4">
                    {applicant.Program?.name}
                  </td>
                  <td className="p-4">{applicant.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Add Applicant
            </h3>

            <form onSubmit={handleCreateApplicant} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />

              {/* Program Dropdown */}
              <select
                value={formData.programId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    programId: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Program</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
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

export default Applicants;