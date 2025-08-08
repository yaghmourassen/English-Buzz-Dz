const BASE_URL = "http://localhost:8080"; // Adjust as needed

export async function fetchDashboardData() {
  try {
    const response = await fetch(`${BASE_URL}/api/dashboard`);
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }
    return await response.json(); // should return { stats: {...}, messages: [...] }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      stats: {
        totalUsers: 0,
        activeUsers: 0,
        blockedUsers: 0,
        totalAnnonces: 0,
      },
      messages: [],
    };
  }
}
