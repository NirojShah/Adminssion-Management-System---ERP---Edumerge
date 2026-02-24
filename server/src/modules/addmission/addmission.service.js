import { sequelize } from "../../config/db.config.js";

const { Admission, Applicant, Quota } = sequelize.models;

/*
=========================================
Create Admission (Seat Lock Only)
=========================================
*/
export const createAdmissionService = async (
  { applicantId, quotaId, allotmentNumber },
  transaction
) => {
  const applicant = await Applicant.findByPk(applicantId, {
    transaction,
  });

  if (!applicant) {
    return { success: false, message: "Applicant not found" };
  }

  const quota = await Quota.findByPk(quotaId, {
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  if (!quota) {
    return { success: false, message: "Quota not found" };
  }

  const existingAdmission = await Admission.findOne({
    where: { applicantId },
    transaction,
  });

  if (existingAdmission) {
    return {
      success: false,
      message: "Applicant already has admission",
    };
  }

  const totalAvailableSeats =
    quota.totalSeats + (quota.supernumerarySeats || 0);

  if (quota.filledSeats >= totalAvailableSeats) {
    return {
      success: false,
      message: "No seats available in this quota",
    };
  }

  const admission = await Admission.create(
    {
      applicantId,
      programId: applicant.programId,
      quotaId,
      allotmentNumber: allotmentNumber || null,
      status: "SEAT_LOCKED",
      feeStatus: "PENDING",
    },
    { transaction }
  );

  quota.filledSeats += 1;
  await quota.save({ transaction });

  return {
    success: true,
    data: admission,
  };
};

/*
=========================================
Mark Fee Paid
=========================================
*/
export const markFeePaidService = async (id, transaction) => {
  const admission = await Admission.findByPk(id, {
    transaction,
  });

  if (!admission) {
    return { success: false, message: "Admission not found" };
  }

  admission.feeStatus = "PAID";
  await admission.save({ transaction });

  return {
    success: true,
    data: admission,
  };
};

/*
=========================================
Confirm Admission
=========================================
*/
export const confirmAdmissionService = async (id, transaction) => {
  const admission = await Admission.findByPk(id, {
    transaction,
    lock: transaction.LOCK.UPDATE,
    include: [
      {
        model: Applicant,
        include: ["Program"],
      },
      {
        model: Quota,
      },
    ],
  });

  if (!admission)
    return { success: false, message: "Admission not found" };

  if (admission.status === "CONFIRMED")
    return { success: false, message: "Already confirmed" };

  if (admission.feeStatus !== "PAID")
    return { success: false, message: "Fee not paid" };

  const admissionNumber = await generateAdmissionNumber(
    admission,
    transaction
  );

  admission.status = "CONFIRMED";
  admission.admissionNumber = admissionNumber;
  admission.confirmedAt = new Date();

  await admission.save({ transaction });

  return {
    success: true,
    data: admission,
  };
};

/*
=========================================
Cancel Admission (Release Seat)
=========================================
*/
export const cancelAdmissionService = async (id, transaction) => {
  const admission = await Admission.findByPk(id, {
    transaction,
  });

  if (!admission) {
    return {
      success: false,
      message: "Admission not found",
    };
  }

  const quota = await Quota.findByPk(admission.quotaId, {
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  if (quota && quota.filledSeats > 0) {
    quota.filledSeats -= 1;
    await quota.save({ transaction });
  }

  admission.status = "CANCELLED";
  await admission.save({ transaction });

  return {
    success: true,
    message: "Admission cancelled successfully",
  };
};

/*
=========================================
Get All Admissions
=========================================
*/
export const getAllAdmissionsService = async () => {
  const admissions = await Admission.findAll({
    include: [
      {
        model: Applicant,
        include: ["Program"],
      },
      {
        model: Quota,
        include: ["Program"],
      },
    ],
  });

  return {
    success: true,
    data: admissions,
  };
};

/*
=========================================
Get Admission By ID
=========================================
*/
export const getAdmissionByIdService = async (id) => {
  const admission = await Admission.findByPk(id, {
    include: [
      {
        model: Applicant,
        include: ["Program"],
      },
      {
        model: Quota,
        include: ["Program"],
      },
    ],
  });

  if (!admission) {
    return {
      success: false,
      message: "Admission not found",
    };
  }

  return {
    success: true,
    data: admission,
  };
};

/*
=========================================
Generate Admission Number (Safe Version)
=========================================
*/
const generateAdmissionNumber = async (
  admission,
  transaction
) => {
  const year = new Date().getFullYear();

  const lastAdmission = await Admission.findOne({
    where: { status: "CONFIRMED" },
    order: [["id", "DESC"]],
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  let sequence = 1;

  if (lastAdmission?.admissionNumber) {
    const lastSeq = parseInt(
      lastAdmission.admissionNumber.split("/").pop()
    );
    sequence = lastSeq + 1;
  }

  const padded = String(sequence).padStart(4, "0");

  return `INST/${year}/${admission.Applicant.Program.courseType}/${admission.Applicant.Program.name}/${admission.Quota.quotaType}/${padded}`;
};