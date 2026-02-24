import { DataTypes } from "sequelize";

export const departmentModel = (sequelize) => {
  const Department = sequelize.define(
    "Department",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      campusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      tableName: "departments",
      timestamps: true,
      underscored: true,
    },
  );
  return Department;
};
