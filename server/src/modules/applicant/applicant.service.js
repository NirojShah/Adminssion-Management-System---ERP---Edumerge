import { sequelize } from "../../config/db.config.js";

const { Applicant, Program } = sequelize.models;

/*
=========================================
Create Applicant
=========================================
*/
export const createApplicantService = async (
  {
    programId,
    firstName,
    lastName,
    email,
    phone,
    category,
    gender,
    dateOfBirth,
  },
  transaction
) => {
  const program = await Program.findByPk(programId, { transaction });

  if (!program) {
    return {
      success: false,
      message: "Program not found",
    };
  }

  const applicant = await Applicant.create(
    {
      programId,
      firstName,
      lastName,
      email,
      phone,
      category,
      gender,
      dateOfBirth,
    },
    { transaction }
  );

  return {
    success: true,
    data: applicant,
  };
};

/*
=========================================
Get All Applicants
=========================================
*/
export const getAllApplicantsService = async () => {
  const applicants = await Applicant.findAll({
    include: ["Program"],
  });

  return {
    success: true,
    data: applicants,
  };
};

/*
=========================================
Get Applicant By ID
=========================================
*/
export const getApplicantByIdService = async (id) => {
  const applicant = await Applicant.findByPk(id, {
    include: ["Program"],
  });

  if (!applicant) {
    return {
      success: false,
      message: "Applicant not found",
    };
  }

  return {
    success: true,
    data: applicant,
  };
};

/*
=========================================
Update Applicant
=========================================
*/
export const updateApplicantService = async (
  id,
  updateData,
  transaction
) => {
  const applicant = await Applicant.findByPk(id, { transaction });

  if (!applicant) {
    return {
      success: false,
      message: "Applicant not found",
    };
  }

  await applicant.update(updateData, { transaction });

  return {
    success: true,
    data: applicant,
  };
};

/*
=========================================
Delete Applicant
=========================================
*/
export const deleteApplicantService = async (id, transaction) => {
  const applicant = await Applicant.findByPk(id, { transaction });

  if (!applicant) {
    return {
      success: false,
      message: "Applicant not found",
    };
  }

  await applicant.destroy({ transaction });

  return {
    success: true,
  };
};