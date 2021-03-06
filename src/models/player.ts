import axios from "axios";
import { TeamseyesAuth } from "./token";

export class Player extends TeamseyesAuth {
  static async playerSearch(playerName: any) {
    const response = await axios.get(`/api/player/${playerName}`, {
      headers: {
        ...Player.getAuthHeader(),
      },
    });
    return response.data;
  }

  static async getPlayerPPI(objPlayer: any) {
    const response = await axios.put(`/api/player/playerPPI`, objPlayer, {
      headers: {
        ...Player.getAuthHeader(),
      },
    });
    return response.data;
  }

  static async getListPlayerSuggestion(objPlayer: any) {
    const response = await axios.put(
      `/api/player/suggest/listPlayer`,
      objPlayer,
      {
        headers: {
          ...Player.getAuthHeader(),
        },
      }
    );
    return response.data;
  }

  static async getPlayerPPIHistory(objPlayer: any) {
    const response = await axios.put(`/api/player/ppiChart/getPPI`, objPlayer, {
      headers: {
        ...Player.getAuthHeader(),
      },
    });
    return response.data;
  }

  static async getSeasonTeam(objPlayer: any) {
    const response = await axios.put(
      `/api/player/playerInformation`,
      objPlayer,
      {
        headers: {
          ...Player.getAuthHeader(),
        },
      }
    );
    return response.data;
  }

  static async getPlayerPlayedTheMost() {
    const response = await axios.get(`/api/player/played/theMost`, {
      headers: {
        ...Player.getAuthHeader(),
      },
    });
    return response.data;
  }

  static async getPlayerData(objPlayer: any) {
    const response = await axios.put(
      `/api/player/playerData/worstPlayer`,
      objPlayer,
      {
        headers: {
          ...Player.getAuthHeader(),
        },
      }
    );
    return response.data;
  }
}
