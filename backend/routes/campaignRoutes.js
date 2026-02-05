import express from "express";
import { createCampaign, listCampaigns, getCampaign, updateCampaignStatus, getStats, simulate } from "../controllers/campaignController.js";

import { validateCampaign } from "../middlewares/validateCampaign.js";
import { validateStatus } from "../middlewares/validateStatus.js";
import { autoCampaign } from "../middlewares/autoCampaign.js";

const router = express.Router();

router.post("/", validateCampaign, createCampaign);
router.get("/",listCampaigns);
router.get("/:id", autoCampaign, getCampaign);
router.patch("/:id/status", autoCampaign, validateStatus, updateCampaignStatus);
router.get("/:id/stats", autoCampaign, getStats);
router.post("/:id/simulate", autoCampaign, simulate);

export default router;
