export const ModelAssociation = (db) => {
  const {
    User,
    Institution,
    Campus,
    Department,
    AcademicYear,
    Program,
    Quota,
    Applicant,
    ApplicantDocument,
    Admission,
    AdmissionCounter,
  } = db;

  /*
  =========================================
  Institution → Campus
  =========================================
  */
  Institution.hasMany(Campus, {
    foreignKey: "institutionId",
    onDelete: "CASCADE",
  });

  Campus.belongsTo(Institution, {
    foreignKey: "institutionId",
  });

  /*
  =========================================
  Campus → Department
  =========================================
  */
  Campus.hasMany(Department, {
    foreignKey: "campusId",
    onDelete: "CASCADE",
  });

  Department.belongsTo(Campus, {
    foreignKey: "campusId",
  });

  /*
  =========================================
  Department → Program
  =========================================
  */
  Department.hasMany(Program, {
    foreignKey: "departmentId",
    onDelete: "CASCADE",
  });

  Program.belongsTo(Department, {
    foreignKey: "departmentId",
  });

  /*
  =========================================
  AcademicYear → Program
  =========================================
  */
  AcademicYear.hasMany(Program, {
    foreignKey: "academicYearId",
    onDelete: "CASCADE",
  });

  Program.belongsTo(AcademicYear, {
    foreignKey: "academicYearId",
  });

  /*
  =========================================
  Program → Quota
  =========================================
  */
  Program.hasMany(Quota, {
    foreignKey: "programId",
    onDelete: "CASCADE",
  });

  Quota.belongsTo(Program, {
    foreignKey: "programId",
  });

  /*
  =========================================
  Program → Applicant
  =========================================
  */
  Program.hasMany(Applicant, {
    foreignKey: "programId",
  });

  Applicant.belongsTo(Program, {
    foreignKey: "programId",
  });

  /*
  =========================================
  Applicant → ApplicantDocument
  =========================================
  */
  Applicant.hasMany(ApplicantDocument, {
    foreignKey: "applicantId",
    onDelete: "CASCADE",
  });

  ApplicantDocument.belongsTo(Applicant, {
    foreignKey: "applicantId",
  });

  /*
  =========================================
  Applicant → Admission (One-to-One)
  =========================================
  */
  Applicant.hasOne(Admission, {
    foreignKey: "applicantId",
    onDelete: "CASCADE",
  });

  Admission.belongsTo(Applicant, {
    foreignKey: "applicantId",
  });

  /*
  =========================================
  Program → Admission
  =========================================
  */
  Program.hasMany(Admission, {
    foreignKey: "programId",
  });

  Admission.belongsTo(Program, {
    foreignKey: "programId",
  });

  /*
  =========================================
  Quota → Admission
  =========================================
  */
  Quota.hasMany(Admission, {
    foreignKey: "quotaId",
  });

  Admission.belongsTo(Quota, {
    foreignKey: "quotaId",
  });

  /*
  =========================================
  Program → AdmissionCounter
  =========================================
  */
  Program.hasMany(AdmissionCounter, {
    foreignKey: "programId",
    onDelete: "CASCADE",
  });

  AdmissionCounter.belongsTo(Program, {
    foreignKey: "programId",
  });

  /*
  =========================================
  Quota → AdmissionCounter
  =========================================
  */
  Quota.hasMany(AdmissionCounter, {
    foreignKey: "quotaId",
    onDelete: "CASCADE",
  });

  AdmissionCounter.belongsTo(Quota, {
    foreignKey: "quotaId",
  });
};