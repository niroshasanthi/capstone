import API from "./api";

// Fetch apps for a child
export const getChildApps = async (childId) => {
  try {
    const response = await API.get(`/${childId}/apps`);
    return response.data; // list of AppDto
  } catch (error) {
    console.error("Error fetching apps:", error);
    throw error;
  }
};
