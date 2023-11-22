<template>
  <Form class="products" @submit="login" :validation-schema="loginFormSchema">
    <div class="form-outline mb-4">
      <label class="form-label font-weight-bolder" for="email">Email</label>
      <Field
        name="email"
        type="email"
        class="form-control form-control-lg"
        v-model="infoLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <div class="form-outline mb-4">
      <label class="form-label font-weight-bolder" for="password"
        >Mật Khẩu</label
      >
      <Field
        type="password"
        name="password"
        class="form-control form-control-lg"
        v-model="infoLocal.password"
      />
      <ErrorMessage name="password" class="error-feedback" />
    </div>

    <div class="form-group">
      <button
        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
      >
        <span class="px-2 font-weight-bolder">Đăng Nhập</span>
      </button>
    </div>

    <p class="text-center text-muted mt-5 mb-0">
      Bạn chưa có tài khoản ?
      <router-link
        :to="{ name: 'Signup' }"
        tag="button"
        class="btn btn-default d-inline-block link-form pt-0"
      >
        Đăng Ký</router-link
      >
    </p>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:login"],
  props: {
    info: { type: Object, required: true },
  },

  data() {
    const loginFormSchema = yup.object().shape({
      email: yup
        .string()
        .required("Email phải có giá trị")
        .email("E-mail không hợp lệ.")
        .max(50, "E-mail tối đa 50 ký tự."),

      password: yup
        .string()
        .required("Mật khẩu phải có giá trị")
        .min(5, "Mậ khẩu phải ít nhất 5 ký tự."),
    });
    return {
      infoLocal: this.info,
      loginFormSchema,
    };
  },
  methods: {
    login() {
      this.$emit("submit:login", this.infoLocal);
    },
  },
};
</script>
