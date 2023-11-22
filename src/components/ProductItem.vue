<script>
export default {
  props: {
    item: { type: Object, required: true },
  },
};
</script>
<template>
  <div class="mx-5">
    <div>
      <img :src="item.image" class="img-manager" />
    </div>
    <div class="p-1 border-bottom py-3">
      <strong>Tên Sản Phẩm: </strong>
      {{ item.name }}
    </div>
    <div class="p-1 border-bottom py-3">
      <strong>Giá Sản Phẩm: </strong>
      {{ Intl.NumberFormat().format(item.price) }}đ
    </div>
    <div class="p-1 border-bottom py-3 break-line">
      <strong>Mô Tả Sản Phẩm: </strong>
      {{ item.description }}
    </div>

    <div class="p-1 border-bottom py-3">
      <strong>Sản Phẩm yêu thích:&nbsp;</strong>
      <div v-if="item.favorite" class="d-inline-block">
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <div v-else class="d-inline-block">
        <i class="fa-solid fa-circle-xmark"></i>
      </div>
    </div>
  </div>
</template>
