import Campaign from "../models/campaignModel.js";

export const autoCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);
    if (!campaign){
        return res.status(404).json({ error: "Campagne introuvable" });
    }

    if (campaign.endDate < new Date()) {
      campaign.status = "finished";
      await campaign.save();
    }
    if (campaign.startDate <= new Date() && campaign.status === "paused") {
      campaign.status = "active";
      await campaign.save();
    }

    req.campaign = campaign;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
