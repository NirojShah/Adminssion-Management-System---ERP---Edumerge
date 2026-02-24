import { sequelize } from "../../config/db.config.js";

const { Campus, Institution } = sequelize.models;

/*
=========================================
Create Campus
=========================================
*/
export const createCampusService = async (
  { institutionId, name },
  transaction
) => {
  const institution = await Institution.findByPk(institutionId, {
    transaction,
  });

  if (!institution) {
    return {
      success: false,
      message: "Institution not found",
    };
  }

  const campus = await Campus.create(
    {
      institutionId,
      name,
    },
    { transaction }
  );

  return {
    success: true,
    data: campus,
  };
};

/*
=========================================
Get All Campuses
=========================================
*/
export const getAllCampusesService = async () => {
  const campuses = await Campus.findAll({
    include: ["Institution"],
  });

  return {
    success: true,
    data: campuses,
  };
};

/*
=========================================
Get Campus By ID
=========================================
*/
export const getCampusByIdService = async (id) => {
  const campus = await Campus.findByPk(id, {
    include: ["Institution"],
  });

  if (!campus) {
    return {
      success: false,
      message: "Campus not found",
    };
  }

  return {
    success: true,
    data: campus,
  };
};

/*
=========================================
Update Campus
=========================================
*/
export const updateCampusService = async (
  id,
  updateData,
  transaction
) => {
  const campus = await Campus.findByPk(id, { transaction });

  if (!campus) {
    return {
      success: false,
      message: "Campus not found",
    };
  }

  await campus.update(updateData, { transaction });

  return {
    success: true,
    data: campus,
  };
};

/*
=========================================
Delete Campus
=========================================
*/
export const deleteCampusService = async (id, transaction) => {
  const campus = await Campus.findByPk(id, { transaction });

  if (!campus) {
    return {
      success: false,
      message: "Campus not found",
    };
  }

  await campus.destroy({ transaction });

  return {
    success: true,
  };
};