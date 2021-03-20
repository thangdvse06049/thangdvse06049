import axios from "axios";

export class User {
  static async login(email: string, password: string) {
    return axios.post("/api/auth/login", {
      email,
      password,
    });
  }
}
