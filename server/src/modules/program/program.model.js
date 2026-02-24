import { DataTypes } from "sequelize";

export const programModel = (sequelize) => {
  const Program = sequelize.define(
    "Program",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      academicYearId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      courseType: {
        type: DataTypes.ENUM("UG", "PG"),
        allowNull: false,
      },
      entryType: {
        type: DataTypes.ENUM("REGULAR", "LATERAL"),
        allowNull: false,
      },
      totalIntake: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "programs",
      timestamps: true,
      underscored: true,
    },
  );
  return Program;
};
