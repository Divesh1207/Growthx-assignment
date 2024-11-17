import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Update this with your backend URL
});

api.interceptors.request.use(
  (config) => {
    const userType = localStorage.getItem("userType");
    let token;

    if (userType === "admin") {
      token = localStorage.getItem("adminToken");
    } else {
      token = localStorage.getItem("token");
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (name, email, password) => {
  const response = await api.post("/users/register", { name, email, password });
  return response.data;
};

export const registerAdmin = async (name, email, password) => {
  const response = await api.post("/admins/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    if (!response.data.token) {
      throw new Error("No token received");
    }
    return response.data;
  } catch (error) {
    console.error("User login error:", error);
    throw error;
  }
};

export const loginAdmin = async (email, password) => {
  try {
    const response = await api.post("/admins/login", { email, password });
    if (!response.data.token) {
      throw new Error("No token received");
    }
    return response.data;
  } catch (error) {
    console.error("Admin login error:", error);
    throw error;
  }
};

export const getAdmins = async () => {
  const response = await api.get("/users/admins");
  return response.data;
};

export const submitAssignment = async (task, admin) => {
  const response = await api.post("/assignments/upload", { task, admin });
  return response.data;
};
export const getUserAssignments = async () => {
  try {
    const response = await api.get("/assignments/user-assignments");
    return response.data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
};

// api.js mein
export const getAdminAssignments = async () => {
  try {
    const token = localStorage.getItem("adminToken"); // Ensure you’re using "adminToken" here
    const response = await api.get("/assignments/admin-assignments", {
      headers: {
        Authorization: `Bearer ${token}`, // Confirm correct header format
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin assignments:", error); // Logs the error details
    throw error;
  }
};

export const acceptAssignment = async (id) => {
  const response = await api.post(`/assignments/${id}/accept`);
  return response.data;
};

export const rejectAssignment = async (id) => {
  const response = await api.post(`/assignments/${id}/reject`);
  return response.data;
};
