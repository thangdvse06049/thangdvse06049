import axios from "axios";
import { TeamseyesAuth } from "./token";

export class Team extends TeamseyesAuth {
  static async teamFormation() {
    const response = await axios.get("/api/teams", {
      headers: {
        ...Team.getAuthHeader(),
      },
    });
    return response.data;
  }
}
