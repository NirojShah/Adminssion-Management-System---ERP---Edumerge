import { userModel } from "../modules/user/user.model.js";
import { admissionModel } from "../modules/addmission/addmission.model.js";
import { admissionCounterModel } from "../modules/addmission/addmissioncounter.model.js";
import { applicantModel } from "../modules/applicant/applicant.model.js";
import { applicantDocumentModel } from "../modules/document/document.model.js";
import { quotaModel } from "../modules/quota/quota.model.js";
import { programModel } from "../modules/program/program.model.js";
import { institutionModel } from "../modules/institution/institution.model.js";
import { departmentModel } from "../modules/department/department.model.js";
import { campusModel } from "../modules/campus/campus.model.js";
import { academicYearModel } from "../modules/academic-year/academicyear.model.js";

export const initializeTables = (sequelize) => {
  const models = {};

  const rawModels = {
    User: userModel,
    Admission: admissionModel,
    AdmissionCounter: admissionCounterModel, // ✅ fixed spelling
    Applicant: applicantModel,
    ApplicantDocument: applicantDocumentModel,
    Quota: quotaModel,
    Program: programModel, // ✅ singular & matches association
    Institution: institutionModel,
    Department: departmentModel,
    Campus: campusModel,
    AcademicYear: academicYearModel,
  };

  for (const modelName in rawModels) {
    models[modelName] = rawModels[modelName](sequelize);
  }

  return models;
};
