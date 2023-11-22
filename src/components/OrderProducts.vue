<template>
  <div class="order_summary products">
    <h1 class="order-title">Đơn Hàng</h1>
    <div class="summary_card">
      <div
        v-for="(cartItem, index) in cartList"
        :key="cartItem._id"
        class="card_item"
      >
        <div class="product_img">
          <img :src="cartItem.image" alt="" />
        </div>

        <div class="product_info">
          <h1>{{ cartItem.name }}</h1>
          <p>Số Lượng: {{ cartItem.quantity }}</p>
          <div class="product_rate_info">
            <span class="px-1">Giá: </span>
            <span class="">
              {{ Intl.NumberFormat().format(cartItem.price) }}đ
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div class="order_price">
        <p>Tổng phí</p>
        <h4>{{ totalSum }}đ</h4>
      </div>
      <div class="order_service">
        <p>Giảm Giá</p>
        <h4>0đ</h4>
      </div>
      <div class="order_total">
        <p>Tổng Đơn</p>
        <h4>{{ totalSum }}đ</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cartList: { type: Array, default: [] },
  },
  emits: ["update:total"],
  computed: {
    totalSum() {
      let total = 0;
      this.cartList.forEach((item, i) => {
        total += item.price * item.quantity;
      });
      this.$emit("update:total", total);
      return Intl.NumberFormat().format(total);
    },
  },
  //   methods: {
  //     removecartListItem(cartId) {
  //     },
  //     updateQuantity(cartId, i, quantity) {
  //       this.cart[i].quantity = quantity;
  //       this.$emit("update-quantity", cartId, this.cart[i]);
  //     },
  //   },
};
</script>
