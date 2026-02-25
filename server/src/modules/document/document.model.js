import { DataTypes } from "sequelize";

export const applicantDocumentModel = (sequelize) => {
  const ApplicantDocument = sequelize.define(
    "ApplicantDocument",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      applicantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      documentName: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM(
          "PENDING",
          "SUBMITTED",
          "VERIFIED",
          "REJECTED"
        ),
        defaultValue: "PENDING",
      },

      remarks: {
        type: DataTypes.STRING,
      },

      verifiedBy: {
        type: DataTypes.INTEGER, // user id
        allowNull: true,
      },

      verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "applicant_documents",
      timestamps: true,
      underscored: true,
    }
  );

  return ApplicantDocument;
};