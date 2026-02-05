import express from "express";
import { createCampaign, listCampaigns, getCampaign, updateCampaignStatus, getStats, simulate } from "../controllers/campaignController.js";

import { validateCampaign } from "../middlewares/validateCampaign.js";
import { validateStatus } from "../middlewares/validateStatus.js";
import { autoFinishCampaign } from "../middlewares/autoFinishCampaign.js";

const router = express.Router();

router.post("/", validateCampaign, createCampaign);
router.get("/", listCampaigns);
router.get("/:id", autoFinishCampaign, getCampaign);
router.patch("/:id/status", autoFinishCampaign, validateStatus, updateCampaignStatus);
router.get("/:id/stats", autoFinishCampaign, getStats);
router.post("/:id/simulate", autoFinishCampaign, simulate);

export default router;
