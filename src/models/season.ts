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
}
