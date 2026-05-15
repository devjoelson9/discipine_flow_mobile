import { ApiResponse, DashboardData } from "@/types/dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";

class ApiClient {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL =
      process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";

    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Request interceptor to add token
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        try {
          const token = await AsyncStorage.getItem("auth_token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error retrieving auth token:", error);
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid - handle logout
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      },
    );
  }

  private handleUnauthorized = async () => {
    await AsyncStorage.removeItem("auth_token");
    // Dispatch logout event or redirect to login
    // This should be handled by the app's authentication context
  };

  // Dashboard endpoints
  async getDashboardData(): Promise<DashboardData> {
    try {
      const response =
        await this.instance.get<ApiResponse<DashboardData>>("/dashboard");
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(
        response.data.message || "Failed to fetch dashboard data",
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getStats() {
    try {
      const response = await this.instance.get("/dashboard/stats");
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getStudyTotals() {
    try {
      const response = await this.instance.get("/dashboard/study-totals");
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getWeeklyResume() {
    try {
      const response = await this.instance.get("/dashboard/weekly-resume");
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getChartData() {
    try {
      const response = await this.instance.get("/dashboard/charts");
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getHeatmap() {
    try {
      const response = await this.instance.get("/dashboard/heatmap");
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getBadges() {
    try {
      const response = await this.instance.get("/dashboard/badges");
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getUpcomingStudies() {
    try {
      const response = await this.instance.get("/dashboard/upcoming-studies");
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getNextExam() {
    try {
      const response = await this.instance.get("/dashboard/next-exam");
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getFocusedDisciplines() {
    try {
      const response = await this.instance.get(
        "/dashboard/focused-disciplines",
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getReviewsToday() {
    try {
      const response = await this.instance.get("/dashboard/reviews-today");
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getTimerState() {
    try {
      const response = await this.instance.get("/timer/state");
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async completeOnboarding() {
    try {
      const response = await this.instance.post(
        "/user/complete-onboarding",
        {},
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    } else {
      console.error("Unexpected error:", error);
    }
  }

  setBaseURL(url: string) {
    this.baseURL = url;
    this.instance.defaults.baseURL = url;
  }

  setAuthToken(token: string) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  clearAuthToken() {
    delete this.instance.defaults.headers.common["Authorization"];
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing
export default ApiClient;
