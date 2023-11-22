import createApiClient from "./api.service";

class SignupService {
  constructor(baseUrl = "/api/SoNeShop/signup") {
    this.api = createApiClient(baseUrl);
  }

  async create(data) {
    var res =await this.api.post("/", data)
    return res.data;
  }

  async auth(data){
    var res = await this.api.post("/auth", data);
    console.log(data)
    return res.data;
  }
}
export default new SignupService();
