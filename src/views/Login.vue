<template>
  <section class="">
    <div class=""></div>
    <div class="card mx-4 mx-md-5 shadow-5-strong log-form">
      <div class="card-body py-5 px-md-5">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-8">
            <h1 class="fw-bold mb-5 products edit-title text-center">
              Đăng Nhập
            </h1>
            <LoginForm :info="info" @submit:login="login" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import LoginForm from "@/components/LoginForm.vue";
import SignupService from "@/services/signup.service";
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      info: {},
    };
  },
  computed: {
    userStrings() {
      return this.products.map((product) => {
        const { name, price } = product;
        return [name, price].join("");
      });
    },
    filteredUsers() {
      if (!this.searchText) return this.products;
      return this.products.filter((_product, index) =>
        this.productStrings[index].includes(this.searchText)
      );
    },
  },
  methods: {
    async login(user) {
      try {
        this.info = await SignupService.auth(user);
        if (this.info) {
          alert("Đăng nhập thành công");
          this.$router.push({ name: "manager" });
        }
        // else {
        //   alert("Tài khoản không hợp lệ");
        // }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
};
</script>
