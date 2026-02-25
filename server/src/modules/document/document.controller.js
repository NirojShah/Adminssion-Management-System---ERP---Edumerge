import {
  createDocumentsService,
  updateDocumentStatusService,
  getApplicantDocumentsService,
} from "./document.service.js";

export const createDocuments = async (req, res) => {
  try {
    const { applicantId, documents } = req.body;

    const result = await createDocumentsService(
      applicantId,
      documents
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateDocumentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await updateDocumentStatusService(
      id,
      status
    );

    return res
      .status(result.success ? 200 : 404)
      .json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getApplicantDocuments = async (req, res) => {
  try {
    const { applicantId } = req.params;

    const result =
      await getApplicantDocumentsService(applicantId);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};