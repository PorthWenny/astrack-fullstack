import jwt from "jsonwebtoken";

export const should_be_logged_in = async (req, res) => {
  res.status(200).json({ message: "Authorized" });
};

export const should_be_admin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    if (!payload.isAdmin)
      return res.status(403).json({ message: "You are not an admin" });
  });

  res.status(200).json({ message: "Authorized" });
};
