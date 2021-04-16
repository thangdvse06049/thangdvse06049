import axios from "axios";
import { TeamseyesAuth } from "./token";

export class User extends TeamseyesAuth {
  static async login(email: string, password: string) {
    return axios.post("/api/auth/login", {
      email,
      password,
    });
  }

  static async refreshToken() {
    return axios.post("/api/auth/token/refresh", null, {
      headers: {
        ...User.getAuthHeader(),
      },
    });
  }

  static async updateUser(objUser: any) {
    const response = await axios.put(`/api/update-user`, objUser, {
      headers: {
        ...User.getAuthHeader(),
      },
    });
    return response.data;
  }
}
