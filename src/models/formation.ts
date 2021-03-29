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
}
