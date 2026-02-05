export function validateStatus(req, res, next) {
  const { status } = req.body;
  if (!["active", "paused"].includes(status)) {
    return res.status(400).json({ error: "Status invalide (active ou pause uniquement)" });
  }
  next();
}
