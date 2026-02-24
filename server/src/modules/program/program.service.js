import { sequelize } from "../../config/db.config.js";

const { Program, Department, AcademicYear } = sequelize.models;

/*
=========================================
Create Program
=========================================
*/
export const createProgramService = async (
  {
    departmentId,
    academicYearId,
    name,
    courseType,
    entryType,
    totalIntake,
  },
  transaction
) => {
  const department = await Department.findByPk(departmentId, {
    transaction,
  });

  if (!department) {
    return {
      success: false,
      message: "Department not found",
    };
  }

  const academicYear = await AcademicYear.findByPk(academicYearId, {
    transaction,
  });

  if (!academicYear) {
    return {
      success: false,
      message: "Academic year not found",
    };
  }

  const program = await Program.create(
    {
      departmentId,
      academicYearId,
      name,
      courseType,
      entryType,
      totalIntake,
    },
    { transaction }
  );

  return {
    success: true,
    data: program,
  };
};

/*
=========================================
Get All Programs
=========================================
*/
export const getAllProgramsService = async () => {
  const programs = await Program.findAll({
    include: [
      {
        model: Department,
        include: ["Campus"],
      },
      {
        model: AcademicYear,
      },
    ],
  });

  return {
    success: true,
    data: programs,
  };
};

/*
=========================================
Get Program By ID
=========================================
*/
export const getProgramByIdService = async (id) => {
  const program = await Program.findByPk(id, {
    include: [
      {
        model: Department,
        include: ["Campus"],
      },
      {
        model: AcademicYear,
      },
    ],
  });

  if (!program) {
    return {
      success: false,
      message: "Program not found",
    };
  }

  return {
    success: true,
    data: program,
  };
};

/*
=========================================
Update Program
=========================================
*/
export const updateProgramService = async (
  id,
  updateData,
  transaction
) => {
  const program = await Program.findByPk(id, { transaction });

  if (!program) {
    return {
      success: false,
      message: "Program not found",
    };
  }

  await program.update(updateData, { transaction });

  return {
    success: true,
    data: program,
  };
};

/*
=========================================
Delete Program
=========================================
*/
export const deleteProgramService = async (id, transaction) => {
  const program = await Program.findByPk(id, { transaction });

  if (!program) {
    return {
      success: false,
      message: "Program not found",
    };
  }

  await program.destroy({ transaction });

  return {
    success: true,
  };
};