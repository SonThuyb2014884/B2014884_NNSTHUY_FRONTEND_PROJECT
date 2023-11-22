<script>
export default {
  props: {
    cart: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  computed: {
    totalSum() {
      let total = 0;
      this.cart.forEach((item, i) => {
        total += item.price * item.quantity;
      });
      return Intl.NumberFormat().format(total);
    },
  },
  methods: {
    removeCartItem(cartId) {
      this.$emit("delete-cartitem", cartId);
    },
    updateQuantity(cartId, i, quantity) {
      this.cart[i].quantity = quantity;
      this.$emit("update-quantity", cartId, this.cart[i]);
    },
  },
};
</script>

<template>
  <!-- <div>{{ cart[0] }}</div> -->
  <tr v-for="(cartItem, index) in cart" :key="cartItem._id" class="border-bt">
    <th scope="row" class="border-0">
      <div class="p-2">
        <img
          :src="cartItem.image"
          alt=""
          width="70"
          class="img-fluid rounded shadow-sm"
        />
        <div class="ml-3 d-inline-block align-middle">
          <h5 class="mb-0 text-dark d-inline-block align-middle">
            {{ cartItem.name }}
          </h5>
        </div>
      </div>
    </th>
    <td class="align-middle">
      <strong>{{ Intl.NumberFormat().format(cartItem.price) }}đ</strong>
    </td>
    <td class="align-middle">
      <button
        class="btn quantity-btn"
        @click="
          () => updateQuantity(cartItem._id, index, cartItem.quantity - 1)
        "
      >
        -
      </button>
      <span class="quatity">{{ cartItem.quantity }}</span>
      <button
        class="btn quantity-btn"
        @click="
          () => updateQuantity(cartItem._id, index, cartItem.quantity + 1)
        "
      >
        +
      </button>
      <!-- <strong></strong> -->
    </td>
    <td class="align-middle">
      <button class="btn" @click="removeCartItem(cartItem._id)">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </td>
  </tr>
  <tr>
    <th>
      <router-link
        :to="{ name: 'Products' }"
        tag="button"
        class="btn return-btn"
      >
        <i class="fa-solid fa-arrow-left"></i>
        <span class="px-2">Về Trang Sản Phẩm</span>
      </router-link>
    </th>
    <td colspan="3" class="totalframe px-5">
      <div class="total">
        <h5 class="list-inline-item">Tổng Đơn:</h5>
        <h5 class="list-inline-item totalprice">{{ totalSum }}đ</h5>
      </div>
      <div class="total">
        <h5 class="list-inline-item">Giảm Giá:</h5>
        <h5 class="list-inline-item totalprice">0%</h5>
      </div>
      <div class="total">
        <h5 class="list-inline-item">Tổng Cộng:</h5>
        <h5 class="list-inline-item totalprice">{{ totalSum }}đ</h5>
      </div>
      <div class="total">
        <router-link :to="{ name: 'Order' }" tag="button" class="btn order-btn">
          <span class="px-2 font-weight-bold">Đặt Hàng</span>
        </router-link>
      </div>
    </td>
  </tr>
</template>
