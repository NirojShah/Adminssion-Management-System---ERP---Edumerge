import { DataTypes } from "sequelize";

export const admissionModel = (sequelize) => {
  const Admission = sequelize.define(
    "Admission",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      applicantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      programId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quotaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      feeStatus: {
        type: DataTypes.ENUM("PENDING", "PAID"),
        defaultValue: "PENDING",
      },

      confirmedAt: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM("SEAT_LOCKED", "CONFIRMED", "CANCELLED"),
        defaultValue: "SEAT_LOCKED",
      },
      admissionNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },

      allotmentNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "admissions",
      timestamps: true,
      underscored: true,
    },
  );
  return Admission;
};
