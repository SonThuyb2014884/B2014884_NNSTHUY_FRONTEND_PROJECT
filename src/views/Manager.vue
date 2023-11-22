<template>
    <div class="manager">
      <div class="d-flex">
        <h1
          class="text-center font-weight-bold text-dark mt-3 col products-title"
        >
          Danh Sách Sản Phẩm
        </h1>
        <InputSearch v-model="searchText" />
      </div>
      <div class="">
        <div class="row manager-products">
            <div class="">
                <ProductList
                  v-if="filteredProductsCount > 0"
                  :products="filteredProducts"
                  v-model:activeIndex="activeIndex"
                />
          
                <p v-else>
                  <div class="text-center notfound">
                    <i class="fa-solid fa-empty-set notfound-icon text-warning"></i>
                    <h2 class="list-inline-item text-warning">Không có sản phẩm nào</h2>
                  </div>
                </p> 
                <div class="mt-3 row justify-content-around align-items-center">
                  <button class="btn btn-sm return-btn btn-manager font-weight-bold" @click="refreshList">
                    <i class="fa-solid fa-rotate-right"></i> Làm mới
                  </button>
                  <button class="btn btn-sm return-btn btn-manager font-weight-bold" @click="goToAddProduct">
                    <i class="fa-solid fa-plus"></i>Thêm mới
                  </button>
                  <button class="btn btn-sm return-btn btn-manager font-weight-bold" @click="removeAllProduct">
                    <i class="fa-regular fa-trash-can"></i> Xóa tất cả
                  </button>
                </div>
            </div>         
            <div v-if="activeProduct">
              <div >
              <h2 class="py-1 text-center">
                  <i class="fa-solid fa-circle-info"></i>
                  Chi tiết Sản Phẩm
              </h2>
              <ProductItem :item="activeProduct" />
              <router-link 
                :to="{
                  name: 'manager.edit',
                  params: {id: activeProduct._id},
                }"
                class="btn return-btn manager-btn "
              >
                <span class="mt-2 btn-manager font-weight-bold">
                  <i class="fas fa-edit"></i>Hiệu chỉnh
                </span>
              </router-link>
            </div>
           </div>       
        </div>
      </div>  
    </div>
    <!-- </div> -->
  </template>
  <script>
  import InputSearch from "@/components/InputSearch.vue";
  import ContactService from "@/services/contact.service";
  import ProductList from "@/components/ProductList.vue";
  import ProductItem from "@/components/ProductItem.vue"
  export default {
    components: {
      ProductList,
      InputSearch,
      ProductItem
    },
    // props: {
    //   auth: { type: boolean, default: false}
    // },
    data() {
      return {
        products: [],
        activeIndex: -1,
        searchText: "",
      };
    },
    watch: {
      searchText() {
        this.activeIndex = -1;
      },
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
        } catch (error) {
          console.log(error);
        }
      },
  
      refreshList() {
        this.retrieveProducts();
        this.activeIndex = -1;
      },

      goToAddProduct(){
        this.$router.push({ name: "manager.add" });
      },

      async removeAllProduct() {
      if (confirm("Bạn muốn xóa tất cả sản phẩm?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    },
    // created(){
    //   console.log(this.$route.params)
    // },
    mounted() {
      this.refreshList();
    },
  };
  </script>
  