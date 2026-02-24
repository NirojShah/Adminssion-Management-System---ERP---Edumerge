import { DataTypes } from "sequelize";

export const academicYearModel = (sequelize) => {
  const AcademicYear = sequelize.define(
    "AcademicYear",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      year: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "academic_years",
      timestamps: true,
      underscored: true,
    },
  );
  return AcademicYear;
};
