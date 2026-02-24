import { sequelize } from "../../config/db.config.js";

const { Institution } = sequelize.models;

/*
=========================================
Create Institution
=========================================
*/
export const createInstitutionService = async (
  { name, code, institutionCapLimit },
  transaction,
) => {
  const existing = await Institution.findOne({
    where: { code },
    transaction,
  });

  if (existing) {
    return {
      success: false,
      message: "Institution code already exists",
    };
  }

  const institution = await Institution.create(
    {
      name,
      code,
      institutionCapLimit,
    },
    { transaction },
  );

  return {
    success: true,
    data: institution,
  };
};

/*
=========================================
Get All Institutions
=========================================
*/
export const getAllInstitutionsService = async () => {
  const institutions = await Institution.findAll();

  return {
    success: true,
    data: institutions,
  };
};

/*
=========================================
Get Institution By ID
=========================================
*/
export const getInstitutionByIdService = async (id) => {
  const institution = await Institution.findByPk(id);

  if (!institution) {
    return {
      success: false,
      message: "Institution not found",
    };
  }

  return {
    success: true,
    data: institution,
  };
};

/*
=========================================
Update Institution
=========================================
*/
export const updateInstitutionService = async (id, updateData, transaction) => {
  const institution = await Institution.findByPk(id, { transaction });

  if (!institution) {
    return {
      success: false,
      message: "Institution not found",
    };
  }

  await institution.update(updateData, { transaction });

  return {
    success: true,
    data: institution,
  };
};

/*
=========================================
Delete Institution
=========================================
*/
export const deleteInstitutionService = async (id, transaction) => {
  const institution = await Institution.findByPk(id, { transaction });

  if (!institution) {
    return {
      success: false,
      message: "Institution not found",
    };
  }

  await institution.destroy({ transaction });

  return {
    success: true,
  };
};
