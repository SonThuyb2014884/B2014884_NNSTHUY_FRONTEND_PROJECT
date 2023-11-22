import createApiClient from "./api.service";

class OrderService {
  constructor(baseUrl = "/api/SoNeShop/orders") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

}
export default new OrderService();
