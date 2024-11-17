import Assignment from "../models/Assignment.js";

export const uploadAssignment = async (req, res) => {
  try {
    const { task, admin } = req.body;
    console.log("req body in assignment controller", req.body);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = req.user.id;

    if (!task || !admin) {
      return res.status(400).json({ message: "Task and admin are required" });
    }

    const assignment = new Assignment({
      userId,
      task,
      admin,
    });
    console.log("Assignment sccuefully upolad buy user", assignment);

    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    console.error("Error uploading assignment:", error);
    res
      .status(500)
      .json({ message: "Server error while uploading assignment" });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const userId = req.user.id;
    const assignments = await Assignment.find({ userId })
      .populate("admin", "name")
      .sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    if (assignment.admin.toString() !== req.admin.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    assignment.status = "accepted";
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    if (assignment.admin.toString() !== req.admin.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    assignment.status = "rejected";
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// assignment.controller.js mein add karein
// assignment.controller.js
export const getAdminAssignments = async (req, res) => {
  try {
    // Check if admin exists and get ID
    if (!req.admin || !req.admin.id) {
      return res.status(401).json({ message: "Admin not authenticated" });
    }

    const adminId = req.admin.id;
    console.log("Fetching assignments for admin:", adminId);

    // Find assignments where this admin is tagged
    const assignments = await Assignment.find({ admin: adminId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(assignments);
  } catch (error) {
    console.error("Error in getAdminAssignments:", error);
    res.status(500).json({ message: "Server error" });
  }
};
