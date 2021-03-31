import axios from "axios";
import { TeamseyesAuth } from "./token";

export class Formation extends TeamseyesAuth {
  static async list() {
    const response = await axios.get("/api/formations", {
      headers: {
        ...Formation.getAuthHeader(),
      },
    });

    return response.data;
  }

  static async getScheme(scheme: string) {
    const response = await axios.get(`/api/formations/${scheme}`, {
      headers: {
        ...Formation.getAuthHeader(),
      },
    });

    return response.data;
  }

  static async getPositionSuggestions(
    scheme: string,
    position: string,
    rank: number,
    budget: number
  ) {
    const response = await axios.get(
      `/api/formations/${scheme}/suggestions/${position}?rank=${rank}&budget=${
        budget || 0
      }`,
      {
        headers: {
          ...Formation.getAuthHeader(),
        },
      }
    );

    return response.data;
  }
}
