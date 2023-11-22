<template>
  <div class="products">
    <div class="d-flex">
      <h1
        class="text-center font-weight-bold text-dark mt-3 col products-title"
      >
        Tất Cả Sản Phẩm
      </h1>
      <InputSearch v-model="searchText" />
    </div>
    <div class="">
      <div class="row row-products">
        <ProductCard
          v-if="filteredProductsCount > 0"
          :products="filteredProducts"
          v-model:activeIndex="activeIndex"
        />

        <p v-else>
          <div class="text-center notfound">
            <i class="fa-solid fa-empty-set notfound-icon text-warning"></i>
            <h2 class="list-inline-item text-warning">Không có sản phẩm phù hợp</h2>
          </div>
        </p>
      </div>
    </div>
    <div v-if="activeProduct">
      <DetailProduct :product="activeProduct" />
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactService from "@/services/contact.service";
import DetailProduct from "@/components/DetailProduct.vue";
export default {
  components: {
    ProductCard,
    InputSearch,
    DetailProduct,
  },
  data() {
    return {
      products: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
  },

  computed: {
    productStrings() {
      return this.products.map((product) => {
        const { name, price } = product;
        return [name, price].join("");
      });
    },
    filteredProducts() {
      if (!this.searchText) return this.products;
      return this.products.filter((_product, index) =>
        this.productStrings[index].includes(this.searchText)
      );
    },
    activeProduct() {
      if (this.activeIndex < 0) return null;
      return this.filteredProducts[this.activeIndex];
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
  },

  methods: {
    async retrieveProducts() {
      try {
        this.products = await ContactService.getAll();
        // console.log(this.products);
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveProducts();
      // this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
