import { sequelize } from "../../config/db.config.js";

const { Program, Quota, Admission, Applicant } = sequelize.models;

/*
=========================================
Dashboard Summary Service
=========================================
*/
export const getDashboardSummaryService = async () => {
  /*
  ================================
  1️⃣ Total Intake
  ================================
  */
  const totalIntake = await Program.sum("totalIntake");

  /*
  ================================
  2️⃣ Total Confirmed Admissions
  ================================
  */
  const totalAdmitted = await Admission.count({
    where: { status: "CONFIRMED" },
  });

  /*
  ================================
  3️⃣ Quota Wise Filled Seats
  ================================
  */
  const quotaData = await Quota.findAll({
    attributes: [
      "id",
      "quotaType",
      "totalSeats",
      "filledSeats",
    ],
  });

  /*
  ================================
  4️⃣ Remaining Seats
  ================================
  */
  const remainingSeats =
    (totalIntake || 0) - (totalAdmitted || 0);

  /*
  ================================
  5️⃣ Fee Pending List
  ================================
  */
  const feePending = await Admission.findAll({
    where: {
      feeStatus: "PENDING",
      status: "SEAT_LOCKED",
    },
    include: [
      {
        model: Applicant,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  /*
  ================================
  6️⃣ Pending Documents
  ================================
  */
  const pendingDocuments = await Applicant.findAll({
    where: {
      documentStatus: "PENDING",
    },
    attributes: ["id", "firstName", "lastName"],
  });

  return {
    success: true,
    data: {
      summary: {
        totalIntake: totalIntake || 0,
        totalAdmitted,
        remainingSeats,
      },
      quotaBreakdown: quotaData,
      feePendingCount: feePending.length,
      pendingDocumentsCount: pendingDocuments.length,
      feePendingList: feePending,
      pendingDocumentsList: pendingDocuments,
    },
  };
};