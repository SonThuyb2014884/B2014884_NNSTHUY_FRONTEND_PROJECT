<template>
  <section class="bg-signup">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 15px">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-5 products edit-title">
                  Tạo tài khoản 
                </h2>
                <SignupForm :info="info" @submit:signup="signup" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import SignupForm from "@/components/SignupForm.vue";
import SignupService from "@/services/signup.service";
export default {
  components: {
    SignupForm,
  },
  data() {
    return {
      info: {},
    };
  },
  methods: {
    async signup() {
      try {
        await SignupService.create(this.info);
        alert("Đăng Ký thành công");
        this.$router.push({ name: "Signin" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
