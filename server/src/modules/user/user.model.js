import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export const userModel = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM("ADMIN", "ADMISSION_OFFICER", "MANAGEMENT"),
        allowNull: false,
        defaultValue: "ADMISSION_OFFICER",
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      underscored: true,
    },
  );

  User.beforeCreate(async (user) => {
    const saltRound = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    user.password = await bcrypt.hash(user.password, saltRound);
  });

  return User;
};
