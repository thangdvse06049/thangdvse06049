import axios from "axios";
import { TeamseyesAuth } from "./token";

export class Competition extends TeamseyesAuth {
  static async getCompetition(competitionId: any) {
    const response = await axios.get(`/api/competition/${competitionId}`, {
      headers: {
        ...Competition.getAuthHeader(),
      },
    });
    return response.data;
  }
}
