import axios from "axios";
import { TeamseyesAuth } from "./token";

export class Season extends TeamseyesAuth {
  static async getListSeasonByCompetitionId() {
    const response = await axios.get(`/api/seasons`, {
      headers: {
        ...Season.getAuthHeader(),
      },
    });
    return response.data;
  }

  static async getSeasonById(seasonId: any) {
    const response = await axios.get(`/api/seasons/${seasonId}`, {
      headers: {
        ...Season.getAuthHeader(),
      },
    });
    return response.data;
  }
}
