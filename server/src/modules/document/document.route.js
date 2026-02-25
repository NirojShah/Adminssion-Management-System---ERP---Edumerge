import express from "express";
import {
  createDocuments,
  updateDocumentStatus,
  getApplicantDocuments,
} from "./document.controller.js";

import { verifyToken } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const documentRouter = express.Router();

/*
Create document entries
*/
documentRouter.post(
  "/",
  verifyToken,
  authorizeRoles("ADMIN", "ADMISSION_OFFICER"),
  createDocuments
);

/*
Update status
*/
documentRouter.patch(
  "/:id",
  verifyToken,
  authorizeRoles("ADMIN", "ADMISSION_OFFICER"),
  updateDocumentStatus
);

/*
View documents
*/
documentRouter.get(
  "/applicant/:applicantId",
  verifyToken,
  authorizeRoles("ADMIN", "ADMISSION_OFFICER", "MANAGEMENT"),
  getApplicantDocuments
);

export default documentRouter;