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

  static async getTPI(competitionId: any, seasonId: any) {
    const response = await axios.get(
      `/api/teamtpi/tpi?competitionId=${competitionId}&seasonId=${seasonId}`,
      {
        headers: {
          ...Team.getAuthHeader(),
        },
      }
    );
    return response.data;
  }

  static async getSeasons() {
    const response = await axios.get(`/api/teamtpi/seasons`, {
      headers: {
        ...Team.getAuthHeader(),
      },
    });
    return response.data;
  }

  static async getCompetitions() {
    const response = await axios.get(`/api/teamtpi/competitions`, {
      headers: {
        ...Team.getAuthHeader(),
      },
    });
    return response.data;
  }
}
