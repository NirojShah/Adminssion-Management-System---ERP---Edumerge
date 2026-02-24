import { sequelize } from "../../config/db.config.js";

const { Department, Campus } = sequelize.models;

/*
=========================================
Create Department
=========================================
*/
export const createDepartmentService = async (
  { campusId, name },
  transaction
) => {
  const campus = await Campus.findByPk(campusId, { transaction });

  if (!campus) {
    return {
      success: false,
      message: "Campus not found",
    };
  }

  const department = await Department.create(
    {
      campusId,
      name,
    },
    { transaction }
  );

  return {
    success: true,
    data: department,
  };
};

/*
=========================================
Get All Departments
=========================================
*/
export const getAllDepartmentsService = async () => {
  const departments = await Department.findAll({
    include: ["Campus"],
  });

  return {
    success: true,
    data: departments,
  };
};

/*
=========================================
Get Department By ID
=========================================
*/
export const getDepartmentByIdService = async (id) => {
  const department = await Department.findByPk(id, {
    include: ["Campus"],
  });

  if (!department) {
    return {
      success: false,
      message: "Department not found",
    };
  }

  return {
    success: true,
    data: department,
  };
};

/*
=========================================
Update Department
=========================================
*/
export const updateDepartmentService = async (
  id,
  updateData,
  transaction
) => {
  const department = await Department.findByPk(id, { transaction });

  if (!department) {
    return {
      success: false,
      message: "Department not found",
    };
  }

  await department.update(updateData, { transaction });

  return {
    success: true,
    data: department,
  };
};

/*
=========================================
Delete Department
=========================================
*/
export const deleteDepartmentService = async (id, transaction) => {
  const department = await Department.findByPk(id, { transaction });

  if (!department) {
    return {
      success: false,
      message: "Department not found",
    };
  }

  await department.destroy({ transaction });

  return {
    success: true,
  };
};