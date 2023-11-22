<template>
  <div v-if="item" class="color">
    <div class="d-flex manager-title">
      <router-link
        :to="{ name: 'manager' }"
        tag="button"
        class="btn return-btn manager-button"
      >
        <i class="fa-solid fa-arrow-left"></i>
        <span class="px-2">Quay lại</span>
      </router-link>
      <h1 class="text-center font-weight-bold text-dark mt-3 edit-title">
        Tùy chỉnh Sản Phẩm
      </h1>
    </div>

    <ProductForm
      :item="item"
      @submit:item="updateitem"
      @delete:item="deleteitem"
    />
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
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      item: null,
    };
  },
  methods: {
    async getProduct(id) {
      try {
        this.item = await ContactService.get(id);
        // console.log(this.contact.name);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateitem(data) {
      try {
        await ContactService.update(this.item._id, data);
        alert("Sản phẩm được cập nhật thành công.");
        this.$router.push({ name: "manager" });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteitem() {
      if (confirm("Bạn muốn xóa sản phẩm này?")) {
        try {
          await ContactService.delete(this.item._id);
          alert("Xóa sản phẩm thành công");
          this.$router.push({ name: "manager" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getProduct(this.id);
  },
};
</script>
