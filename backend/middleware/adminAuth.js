import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers
    if (!token) {
      return res.status(401).json({
        message: "Not Authorized Login token missing",
        success: false,
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({
        message: "Not Authorized Login Admin credentials",
        success: false,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in admin authentication",
      success: false,
      error,
    });
  }
};

export default adminAuth;
