import { DataTypes } from "sequelize";

export const institutionModel = (sequelize) => {
  const Institution = sequelize.define(
    "Institution",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      institutionCapLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "institutions",
      timestamps: true,
      underscored: true,
    },
  );
  return Institution;
};
