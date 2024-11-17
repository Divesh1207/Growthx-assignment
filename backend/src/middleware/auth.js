// import jwt from "jsonwebtoken";

// export const authUser = (req, res, next) => {
//   const token = req.header("x-auth-token");

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Invalid token structure" });
//     }
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// export const authAdmin = (req, res, next) => {
//   const token = req.header("x-auth-token");

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded.admin;
//     if (!req.admin || !req.admin.id) {
//       return res.status(401).json({ message: "Invalid token structure" });
//     }
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("token in backend auth js", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id); // Ensure you're using decoded.user.id

    console.log("Decoded token:", decoded); // Debugging the decoded token

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    console.log("user authenticated in middlware :", req.user);
    console.log("user authenticated in middlware :", req.token); // Debugging the admin object
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};
export const authAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token in authAdmin middleware:", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verify the token and access the admin ID correctly
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.admin.id); // Use decoded.admin.id

    if (!admin) {
      throw new Error("Admin not found");
    }

    req.admin = admin; // Attach admin object to request
    req.token = token;
    console.log("Admin authenticated in middleware:", req.admin);
    console.log("Token in middleware:", req.token);

    next();
  } catch (error) {
    console.error("Admin authentication error:", error);
    res.status(401).json({ message: "Please authenticate as admin" });
  }
};
