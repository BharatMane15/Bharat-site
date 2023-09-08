const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
exports.isAuthanticatedUser = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "please login to access this resourse",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.authorizeRoles = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(200).json({
          success: false,
          message: `Role: ${req.user.role} is not allowed to access this resource`,
        });
      }
      next();
    };
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
