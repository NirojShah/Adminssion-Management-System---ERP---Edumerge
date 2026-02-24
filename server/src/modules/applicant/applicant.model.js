import { DataTypes } from "sequelize";

export const applicantModel = (sequelize) => {
  const Applicant = sequelize.define(
    "Applicant",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(20),
      },
      category: {
        type: DataTypes.STRING(20),
      },
      entryType: {
        type: DataTypes.ENUM("REGULAR", "LATERAL"),
      },
      quotaType: {
        type: DataTypes.ENUM("KCET", "COMEDK", "MANAGEMENT"),
      },
      marks: {
        type: DataTypes.DECIMAL(5, 2),
      },
      qualifyingExam: {
        type: DataTypes.STRING(100),
      },
      email: {
        type: DataTypes.STRING(150),
      },
      mobile: {
        type: DataTypes.STRING(20),
      },
      status: {
        type: DataTypes.ENUM("CREATED", "ALLOCATED", "CONFIRMED"),
        defaultValue: "CREATED",
      },
      programId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "applicants",
      timestamps: true,
      underscored: true,
    },
  );
  return Applicant;
};
