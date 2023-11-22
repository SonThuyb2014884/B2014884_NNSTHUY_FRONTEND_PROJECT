<template>
  <div class="d-flex">
    <h1 class="text-center font-weight-bold text-dark mt-3 col products-title">
      GIỎ HÀNG
    </h1>
    <InputSearch v-model="searchText" />
  </div>
  <div class="table-responsive">
    <table class="table w-75 margin-cart">
      <thead>
        <tr>
          <th scope="col" class="border-0 bg-cart">
            <div class="p-2 px-3 text-uppercase font-weight-bold">Sản phẩm</div>
          </th>
          <th scope="col" class="border-0 bg-cart">
            <div class="py-2 text-uppercase font-weight-bold">Giá</div>
          </th>
          <th scope="col" class="border-0 bg-cart">
            <div class="py-2 text-uppercase font-weight-bold">Số lượng</div>
          </th>
          <th scope="col" class="border-0 bg-cart">
            <div class="py-2 text-uppercase font-weight-bold">Xóa</div>
          </th>
        </tr>
      </thead>
      <tbody class="bg-light">
        <CartCard
          @delete-cartitem="deleteCartItem"
          @update-quantity="updateCartQuantity"
          v-if="filteredCartItemCount > 0"
          :cart="filteredCart"
        />
        <td colspan="4" v-else>
          <div class="text-center notfound">
            <i class="fa-solid fa-empty-set notfound-icon text-warning"></i>
            <h2 class="list-inline-item text-warning">Không có sản phẩm!</h2>
            <div>
              <router-link
                :to="{ name: 'Products' }"
                tag="button"
                class="btn return-btn"
              >
                <i class="fa-solid fa-arrow-left"></i>
                <span class="px-2">Về Trang Sản Phẩm</span>
              </router-link>
            </div>
          </div>
        </td>
      </tbody>
    </table>
  </div>
</template>
<script>
import CartCard from "@/components/CartCard.vue";
import CartService from "@/services/cart.service";
import InputSearch from "@/components/InputSearch.vue";
export default {
  components: { CartCard, InputSearch },
  data() {
    return {
      cart: [],
    
      searchText: "",
    };
  },
 
  computed: {
    cartStrings() {
      return this.cart.map((cartItem) => {
        const { name, price } = cartItem;
        return [name, price].join("");
      });
    },
    filteredCart() {
      if (!this.searchText) return this.cart;
      return this.cart.filter((_cartItem, index) =>
        this.cartStrings[index].includes(this.searchText)
      );
    },
    filteredCartItemCount() {
      return this.filteredCart.length;
    },
  },
  methods: {
    async retrieveCart() {
      try {
        this.cart = await CartService.getAll();
        
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveCart();
  
    },

    async deleteCartItem(removeId) {
      if (confirm("Bạn muốn xóa sản phẩm này?")) {
        try {
          await CartService.delete(removeId);
          this.retrieveCart();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async updateCartQuantity(cartId, cart) {
      if (cart.quantity < 1) {
        alert("Số lượng sản phẩm phải lớn hơn 0");
        cart.quantity = 1;
      }
      try {
        await CartService.update(cartId, cart);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
