<template>
  <nav class="navbar navbar-expand-lg nabar">
    <div class="nav-title">
      <img src="../assets/img/logo.png" class="logo" />
      <a href="/" class="navbar-brand">SoNeShop</a>
    </div>

    <div class="nav-links">
      <router-link
        :to="{ name: 'Home' }"
        tag="button"
        class="btn btn-default d-inline-block"
        >Trang chủ</router-link
      >
      <router-link
        :to="{ name: 'Products' }"
        tag="button"
        class="btn btn-default d-inline-block"
        >Sản Phẩm</router-link
      >
      <router-link
        v-if="auth"
        :to="{ name: 'manager' }"
        tag="button"
        class="btn btn-default d-inline-block"
        >Quản lý sản phẩm</router-link
      >

      <router-link
        v-else
        :to="{ name: 'Signin' }"
        tag="button"
        class="btn btn-default d-inline-block"
        @click="alertLogin"
        >Quản lý sản phẩm</router-link
      >
      <router-link
        :to="{ name: 'Signin' }"
        tag="button"
        class="btn btn-default d-inline-block"
        >Đăng Ký</router-link
      >
      <router-link
        :to="{ name: 'Cart' }"
        tag="button"
        class="btn btn-default d-inline-block icon font"
        ><i class="fa-solid fa-bag-shopping"></i
      ></router-link>
      <router-link
        :to="{ name: 'Signin' }"
        tag="button"
        class="btn btn-default d-inline-block font"
        @click="setAuth()"
      >
        <i class="fa-solid fa-right-from-bracket"></i>
      </router-link>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      auth: false,
    };
  },
  methods: {
    alertLogin() {
      alert("Đăng nhập để quản lý sản phẩm!");
      this.auth = true;
    },
    setAuth() {
      this.auth = false;
    },
  },

};
</script>
