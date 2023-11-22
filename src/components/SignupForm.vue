<template>
  <Form class="products" @submit="signup" :validation-schema="signupFormSchema">
    <div class="form-outline mb-4">
      <label class="form-label" for="name">Tên Tài Khoản</label>
      <Field
        name="name"
        type="text"
        class="form-control form-control-lg"
        v-model="infoLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>

    <div class="form-outline mb-4">
      <label class="form-label" for="email">Email</label>
      <Field
        type="email"
        name="email"
        class="form-control form-control-lg"
        v-model="infoLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <div class="form-outline mb-4">
      <label class="form-label" for="password">Mật Khẩu</label>
      <Field
        type="password"
        name="password"
        class="form-control form-control-lg"
        v-model="infoLocal.password"
      />
      <ErrorMessage name="password" class="error-feedback" />
    </div>

    <div class="form-outline mb-4">
      <label class="form-label" for="confirm">Nhập lại mật khẩu</label>
      <Field
        type="password"
        name="confirm"
        class="form-control form-control-lg"
        v-model="infoLocal.confirm"
      />
    </div>
    <ErrorMessage name="confirm" class="error-feedback" />
    <div class="form-group">
      <button
        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
      >
        <span class="px-2 font-weight-bolder">Đăng Ký</span>
      </button>
    </div>
  

    <p class="text-center text-muted mt-5 mb-0">
      Bạn đã có tài khoản?
      <router-link
        :to="{ name: 'Signin' }"
        tag="button"
        class="btn btn-default d-inline-block pt-0"
      >
        <span class="link-form">Đăng Nhập</span>
      </router-link>
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
  emits: ["submit:signup"],
  props: {
    info: { type: Object, required: true },
  },

  data() {
    const signupFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(200, "Tên có nhiều nhất 200 ký tự."),

      email: yup
        .string()
        .required("Email phải có giá trị")
        .email("E-mail không hợp lệ.")
        .max(50, "E-mail tối đa 50 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị")
        .min(3, "Tên phải ít nhất 3 ký tự."),
      confirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
    });
    return {
      infoLocal: this.info,
      signupFormSchema,
    };
  },

  methods: {
    signup() {
      this.$emit("submit:signup", this.infoLocal);
    },
  },
};
</script>
