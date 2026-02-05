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
    if (campaign.status === "active") {
        const newImpressions = Math.floor(Math.random() * 5) + 1;
        campaign.impressions += newImpressions;

        const maxClicks = Math.min(campaign.impressions, Math.floor(campaign.budget));
        let newClicks = Math.floor(newImpressions * Math.random() * 0.1);
        if (campaign.clicks + newClicks > maxClicks) newClicks = maxClicks - campaign.clicks;

        campaign.clicks += newClicks;

        if (campaign.clicks >= campaign.impressions) {
            campaign.status = "finished";
        }

        await campaign.save();
    }
    return campaign;
}
