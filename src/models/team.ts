import axios from "axios";
import { TeamseyesAuth } from "./token";

export class Team extends TeamseyesAuth {
  static async teamFormation(teamId: any) {
    const response = await axios.get(`/api/teams/${teamId}`, {
      headers: {
        ...Team.getAuthHeader(),
      },
    });
    return response.data;
  }

  static async getListTeamBySeasonId(seasonId: any) {
    const response = await axios.get(`/api/teams/seasons/${seasonId}`, {
      headers: {
        ...Team.getAuthHeader(),
      },
    });
    return response.data;
  }
}
