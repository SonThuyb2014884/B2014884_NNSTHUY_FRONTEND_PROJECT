<template>
  <div
    class="modal fade text-color"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header pb-2">
          <h1 class="font-weight-bold ml-4 text-center edit-title">
            <i class="fa-solid fa-circle-info"></i>
            Chi Tiết Sản Phẩm
          </h1>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row mt-2 p-3">
            <div class="col-md-6">
              <img :src="product.image" class="rounded image-detail" alt="" />
            </div>
            <div class="col-md-6">
              <h2 class="product_name py-3">
                {{ product.name }}
              </h2>
              <div class="my-4">
                <span class="font-weight-bold">Mô tả: </span>
                <span style="box-sizing: border-box" class="px-2">
                  {{ product.description }}
                </span>
              </div>

              <span class="product_price">
                Giá: {{ Intl.NumberFormat().format(product.price) }}đ
              </span>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: { type: Object, default: {} },
  },
};
</script>
<style>
.text-color {
  color: #000;
}
</style>
