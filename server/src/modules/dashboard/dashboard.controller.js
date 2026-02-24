import {
  getDashboardSummaryService,
} from "./dashboard.service.js";

/*
=========================================
Get Dashboard Summary
=========================================
*/
export const getDashboardSummary = async (req, res) => {
  try {
    const result = await getDashboardSummaryService();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};