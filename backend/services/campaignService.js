import Campaign from "../models/campaignModel.js";

export const createCampaign = async (data) => {
    const campaign = new Campaign({
        ...data,
        status: new Date() > new Date(data.endDate) ? "finished" : "paused",
        impressions: 0,
        clicks: 0
    });
    return await campaign.save();
}

export const listCampaigns = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const campaigns = await Campaign.find().skip(skip).limit(limit);
    const total = await Campaign.countDocuments();
    return { campaigns, total };
}

export const updateStatus = async (campaign, status) => {
    if (campaign.status === "finished") throw new Error("Campagne terminée");
    campaign.status = status;
    return await campaign.save();
}

export const computeStats = (campaign) => {
    const ctr = campaign.impressions > 0 ? campaign.clicks / campaign.impressions : 0;
    const cpc = campaign.clicks > 0 ? campaign.budget / campaign.clicks : 0;
    return { ctr: Number(ctr.toFixed(4)), cpc: Number(cpc.toFixed(2)) };
}

// Simulation impressions et clicks
export const simulateActivity = async (campaign) => {
    if (campaign.status !== "active") return campaign;

    const now = new Date();

    if (campaign.endDate < now) {
        campaign.status = "finished";
        await campaign.save();
        return campaign;
    }

    const newImpressions = Math.floor(Math.random() * 10) + 1; 
    campaign.impressions += newImpressions;

    const budgetRemaining = campaign.budget - campaign.clicks;

    if (budgetRemaining <= 0) {
        campaign.status = "finished";
        await campaign.save();
        return campaign;
    }

    const ctr = 0.05 + Math.random() * 0.15;
    let newClicks = Math.floor(newImpressions * ctr);

    if (newClicks < 1 && budgetRemaining > 0) {
        newClicks = 1;
    }

    if (newClicks > budgetRemaining) {
        newClicks = budgetRemaining;
    }

    campaign.clicks += newClicks;

    if (campaign.clicks >= campaign.budget) {
        campaign.status = "finished";
    }

    await campaign.save();
    return campaign;
};

