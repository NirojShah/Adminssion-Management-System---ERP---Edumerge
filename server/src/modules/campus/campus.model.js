import { DataTypes } from "sequelize";

export const campusModel = (sequelize) => {
  const Campus = sequelize.define(
    "Campus",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      institutionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      tableName: "campuses",
      timestamps: true,
      underscored: true,
    },
  );
  return Campus;
};
