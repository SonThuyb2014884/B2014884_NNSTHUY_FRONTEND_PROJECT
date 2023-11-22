<template>
  <div class="d-flex manager-title">
    <router-link
      :to="{ name: 'manager' }"
      tag="button"
      class="btn return-btn manager-button"
    >
      <i class="fa-solid fa-arrow-left"></i>
      <span class="px-2">Quay lại</span>
    </router-link>
  </div>
  <div v-if="item">
    <h1 class="text-center font-weight-bold text-dark mt-3 edit-title">
      Thêm Sản Phẩm
    </h1>
  </div>

  <ProductForm :item="item" @submit:item="created" />
  <div>
    <!-- <h3 class="text-warning edit-title text-center my-5">{{ message }}</h3> -->
  </div>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";
import ContactService from "@/services/contact.service";
export default {
  components: {
    ProductForm,
  },
  data() {
    return {
      item: {},
    };
  },
  methods: {
    async created() {
      try {
        await ContactService.create(this.item);
        alert("Sản phẩm được thêm thành công.");
        this.$router.push({ name: "manager" });
      } catch (error) {
        console.log(error);
      }
    },
    // refreshList() {
    //   this.created();
    //   // this.activeIndex = -1;
    // },
  },
  mounted() {
    // this.refreshList();
  },
};
</script>
