export const validateCampaign = (req, res, next) => {
  const { name, advertiser, budget, startDate, endDate } = req.body;

  if (!name || !advertiser) {
    return res.status(400).json({ error: "Nom et annonceur requis" });
  }

  if (budget == null || budget < 0.01) {
    return res.status(400).json({ error: "Budget invalide" });
  }

  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Dates requises" });
  }

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ error: "Date de début doit être avant la date de fin" });
  }

  next();
}
