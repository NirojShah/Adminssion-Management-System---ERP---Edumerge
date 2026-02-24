import { DataTypes } from "sequelize";

export const quotaModel = (sequelize) => {
  const Quota = sequelize.define(
    "Quota",
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
      quotaType: {
        type: DataTypes.ENUM("KCET", "COMEDK", "MANAGEMENT"),
        allowNull: false,
      },
      totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      filledSeats: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      supernumerarySeats: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "quotas",
      timestamps: true,
      underscored: true,
    },
  );
  return Quota;
};
