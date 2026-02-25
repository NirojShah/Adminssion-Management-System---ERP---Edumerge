import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const AdmissionForm = () => {
  const [admissions, setAdmissions] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    applicantId: "",
    programId: "",
    quotaId: "",
    feeStatus: "PENDING",
    status: "SEAT_LOCKED",
  });

  // ================= FETCH DATA =================

  const fetchAdmissions = async () => {
    const res = await axiosInstance.get("/addmission");
    if (res.data.success) setAdmissions(res.data.data);
  };

  const fetchApplicants = async () => {
    const res = await axiosInstance.get("/applicant");
    if (res.data.success) setApplicants(res.data.data);
  };

  const fetchPrograms = async () => {
    const res = await axiosInstance.get("/program");
    if (res.data.success) setPrograms(res.data.data);
  };

  const fetchQuotas = async () => {
    const res = await axiosInstance.get("/quota");
    if (res.data.success) setQuotas(res.data.data);
  };

  useEffect(() => {
    const init = async () => {
      await fetchAdmissions();
      await fetchApplicants();
      await fetchPrograms();
      await fetchQuotas();
      setLoading(false);
    };
    init();
  }, []);

  // ================= CREATE =================

  const handleCreateAdmission = async (e) => {
    e.preventDefault();

    const res = await axiosInstance.post("/admission", {
      applicantId: Number(formData.applicantId),
      programId: Number(formData.programId),
      quotaId: Number(formData.quotaId),
      feeStatus: formData.feeStatus,
      status: formData.status,
    });

    if (res.data.success) {
      setAdmissions((prev) => [...prev, res.data.data]);
      setShowModal(false);
      setFormData({
        applicantId: "",
        programId: "",
        quotaId: "",
        feeStatus: "PENDING",
        status: "SEAT_LOCKED",
      });
    } else {
      alert(res.data.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Admissions</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Admission
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded">
        {admissions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No admissions found
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Applicant</th>
                <th className="p-4">Program</th>
                <th className="p-4">Quota</th>
                <th className="p-4">Fee Status</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-4">
                    {a.Applicant?.firstName} {a.Applicant?.lastName}
                  </td>
                  <td className="p-4">{a.Program?.name}</td>
                  <td className="p-4">{a.Quota?.name}</td>
                  <td className="p-4">{a.feeStatus}</td>
                  <td className="p-4">{a.status}</td>
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
            <h3 className="text-lg font-semibold mb-4">Add Admission</h3>

            <form onSubmit={handleCreateAdmission} className="space-y-3">

              {/* Applicant */}
              <select
                className="w-full border p-2 rounded"
                value={formData.applicantId}
                onChange={(e) =>
                  setFormData({ ...formData, applicantId: e.target.value })
                }
                required
              >
                <option value="">Select Applicant</option>
                {applicants.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.firstName} {a.lastName}
                  </option>
                ))}
              </select>

              {/* Program */}
              <select
                className="w-full border p-2 rounded"
                value={formData.programId}
                onChange={(e) =>
                  setFormData({ ...formData, programId: e.target.value })
                }
                required
              >
                <option value="">Select Program</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              {/* Quota */}
              <select
                className="w-full border p-2 rounded"
                value={formData.quotaId}
                onChange={(e) =>
                  setFormData({ ...formData, quotaId: e.target.value })
                }
                required
              >
                <option value="">Select Quota</option>
                {quotas.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.name}
                  </option>
                ))}
              </select>

              {/* Fee Status */}
              <select
                className="w-full border p-2 rounded"
                value={formData.feeStatus}
                onChange={(e) =>
                  setFormData({ ...formData, feeStatus: e.target.value })
                }
              >
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
              </select>

              {/* Admission Status */}
              <select
                className="w-full border p-2 rounded"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="SEAT_LOCKED">Seat Locked</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
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

export default AdmissionForm;