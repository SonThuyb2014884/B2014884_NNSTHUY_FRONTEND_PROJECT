<script>
import CartService from "@/services/cart.service";

export default {
  props: {
    products: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
   
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
 
    async createCart(product) {
      let arrayCart = [];
      let exist = false;
      try {
        arrayCart = await CartService.getAll();
        arrayCart.forEach((element, index) => {
          if (element.name == product.name) {
            alert("Sản phẩm đã có trong giỏ hàng!");
            exist = true;
          }
        });
        if (!exist) {
          await CartService.create(product);
          alert("Thêm sản phẩm vào giỏ hàng!");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<template>
  <div
    class="col-3 item"
    v-for="(product, index) in products"
    :key="product._id"
    :class="{ active: index === activeIndex }"
    @click="updateActiveIndex(index)"
  >
    <div data-toggle="modal" data-target="#exampleModal">
      <img :src="product.image" alt="" class="item-img" />
      <h5 class="item-title">
        {{ product.name }}
      </h5>
    </div>
    <div class="cart-grid">
      <h6>{{ Intl.NumberFormat().format(product.price) }}đ</h6>
      <button class="btn cart-btn" @click="createCart(product)">
        <i class="fa-solid fa-cart-plus cart-btn-icon"></i>
      </button>
    </div>
  </div>
</template>
