const authorize =
  (allowedRoles = []) =>
  (req, res, next) => {
    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      return res
        .status(403)
        .json({ error: 'Access denied: insufficient permissions' });
    }
    next();
  };

export default authorize;