import { sequelize } from "../../config/db.config.js";

const { Quota, Program } = sequelize.models;

/*
=========================================
Create Quota
=========================================
*/
export const createQuotaService = async (
  { programId, quotaType, totalSeats, supernumerarySeats },
  transaction
) => {
  const program = await Program.findByPk(programId, { transaction });

  if (!program) {
    return {
      success: false,
      message: "Program not found",
    };
  }

  const existingQuota = await Quota.findOne({
    where: { programId, quotaType },
    transaction,
  });

  if (existingQuota) {
    return {
      success: false,
      message: "Quota already exists for this program",
    };
  }

  const quota = await Quota.create(
    {
      programId,
      quotaType,
      totalSeats,
      supernumerarySeats,
    },
    { transaction }
  );

  return {
    success: true,
    data: quota,
  };
};

/*
=========================================
Get All Quotas
=========================================
*/
export const getAllQuotasService = async () => {
  const quotas = await Quota.findAll({
    include: ["Program"],
  });

  return {
    success: true,
    data: quotas,
  };
};

/*
=========================================
Get Quota By ID
=========================================
*/
export const getQuotaByIdService = async (id) => {
  const quota = await Quota.findByPk(id, {
    include: ["Program"],
  });

  if (!quota) {
    return {
      success: false,
      message: "Quota not found",
    };
  }

  return {
    success: true,
    data: quota,
  };
};

/*
=========================================
Update Quota
=========================================
*/
export const updateQuotaService = async (
  id,
  updateData,
  transaction
) => {
  const quota = await Quota.findByPk(id, { transaction });

  if (!quota) {
    return {
      success: false,
      message: "Quota not found",
    };
  }

  await quota.update(updateData, { transaction });

  return {
    success: true,
    data: quota,
  };
};

/*
=========================================
Delete Quota
=========================================
*/
export const deleteQuotaService = async (id, transaction) => {
  const quota = await Quota.findByPk(id, { transaction });

  if (!quota) {
    return {
      success: false,
      message: "Quota not found",
    };
  }

  await quota.destroy({ transaction });

  return {
    success: true,
  };
};