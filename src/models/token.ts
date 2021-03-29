export class TeamseyesAuth {
  static getAuthHeader() {
    const token = localStorage.getItem("teamseyes-token");
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
