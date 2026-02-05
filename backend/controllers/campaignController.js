import * as service from "../services/campaignService.js";

export const createCampaign = async (req, res) => {
  try {
    const campaign = await service.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const listCampaigns = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { campaigns, total } = await service.listCampaigns(page, limit);

    const campaignsWithSim = await Promise.all(campaigns.map(c => service.simulateActivity(c)));
    res.json({ campaigns: campaignsWithSim, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getCampaign = async (req, res) => {
  try {
    const campaign = await service.simulateActivity(req.campaign);
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const updateCampaignStatus = async (req, res) => {
  try {
    const updated = await service.updateStatus(req.campaign, req.body.status);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const getStats = (req, res) => {
  const stats = service.computeStats(req.campaign);
  res.json(stats);
}

export const simulate = async (req, res) => {
  try {
    const simulated = await service.simulateActivity(req.campaign);
    res.json(simulated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
