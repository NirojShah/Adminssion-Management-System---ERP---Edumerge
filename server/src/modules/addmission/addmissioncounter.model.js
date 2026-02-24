import { DataTypes } from "sequelize";

export const admissionCounterModel = (sequelize) => {
  const AdmissionCounter = sequelize.define(
    "AdmissionCounter",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      programId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quotaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currentCounter: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "admission_counters",
      timestamps: false,
      underscored: true,
    },
  );
  return AdmissionCounter;
};
