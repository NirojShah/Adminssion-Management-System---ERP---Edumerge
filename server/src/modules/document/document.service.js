import { sequelize } from "../../config/db.config.js";

const { ApplicantDocument } = sequelize.models;

/*
=========================================
Create Documents For Applicant
=========================================
*/
export const createDocumentsService = async (
  applicantId,
  documents
) => {
  const data = documents.map((doc) => ({
    applicantId,
    documentName: doc,
  }));

  const created = await ApplicantDocument.bulkCreate(data);

  return {
    success: true,
    data: created,
  };
};

/*
=========================================
Update Document Status
=========================================
*/
export const updateDocumentStatusService = async (
  id,
  status
) => {
  const document = await ApplicantDocument.findByPk(id);

  if (!document) {
    return {
      success: false,
      message: "Document not found",
    };
  }

  document.status = status;
  await document.save();

  return {
    success: true,
    data: document,
  };
};

/*
=========================================
Get Applicant Documents
=========================================
*/
export const getApplicantDocumentsService = async (
  applicantId
) => {
  const documents = await ApplicantDocument.findAll({
    where: { applicantId },
  });

  return {
    success: true,
    data: documents,
  };
};