import { sequelize } from "../../config/db.config.js";

const { AcademicYear } = sequelize.models;

/*
=========================================
Create Academic Year
=========================================
*/
export const createAcademicYearService = async (
  { year },
  transaction
) => {
  const existing = await AcademicYear.findOne({
    where: { year },
    transaction,
  });

  if (existing) {
    return {
      success: false,
      message: "Academic year already exists",
    };
  }

  const academicYear = await AcademicYear.create(
    { year },
    { transaction }
  );

  return {
    success: true,
    data: academicYear,
  };
};

/*
=========================================
Get All Academic Years
=========================================
*/
export const getAllAcademicYearsService = async () => {
  const years = await AcademicYear.findAll({
    order: [["createdAt", "DESC"]],
  });

  return {
    success: true,
    data: years,
  };
};

/*
=========================================
Get Academic Year By ID
=========================================
*/
export const getAcademicYearByIdService = async (id) => {
  const year = await AcademicYear.findByPk(id);

  if (!year) {
    return {
      success: false,
      message: "Academic year not found",
    };
  }

  return {
    success: true,
    data: year,
  };
};

/*
=========================================
Update Academic Year
=========================================
*/
export const updateAcademicYearService = async (
  id,
  updateData,
  transaction
) => {
  const year = await AcademicYear.findByPk(id, { transaction });

  if (!year) {
    return {
      success: false,
      message: "Academic year not found",
    };
  }

  await year.update(updateData, { transaction });

  return {
    success: true,
    data: year,
  };
};

/*
=========================================
Activate Academic Year
Only one year should be active
=========================================
*/
export const activateAcademicYearService = async (
  id,
  transaction
) => {
  const year = await AcademicYear.findByPk(id, { transaction });

  if (!year) {
    return {
      success: false,
      message: "Academic year not found",
    };
  }

  // Deactivate all
  await AcademicYear.update(
    { isActive: false },
    { where: {}, transaction }
  );

  // Activate selected
  year.isActive = true;
  await year.save({ transaction });

  return {
    success: true,
    message: "Academic year activated successfully",
    data: year,
  };
};

/*
=========================================
Delete Academic Year
=========================================
*/
export const deleteAcademicYearService = async (
  id,
  transaction
) => {
  const year = await AcademicYear.findByPk(id, { transaction });

  if (!year) {
    return {
      success: false,
      message: "Academic year not found",
    };
  }

  await year.destroy({ transaction });

  return {
    success: true,
  };
};