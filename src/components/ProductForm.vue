<template>
  <Form
    class="color form"
    @submit="submitItem"
    :validation-schema="itemFormSchema"
  >
    <div class="form-group my-4">
      <label class="font-weight-bolder mx-3" for="name">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="itemLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group my-4">
      <label class="font-weight-bolder mx-3" for="price">Giá</label>
      <Field
        name="price"
        type="number"
        class="form-control"
        v-model.number="itemLocal.price"
      />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group my-4">
      <label class="font-weight-bolder mx-3" for="description">Mô tả</label>
      <Field
        name="description"
        type="text"
        class="form-control"
        v-model="itemLocal.description"
      />
      <ErrorMessage name="description" class="error-feedback" />
    </div>
    <div class="form-group my-4">
      <label class="font-weight-bolder mx-3" for="image">Ảnh Sản Phẩm</label>
      <Field
        name="image"
        type="text"
        class="form-control"
        v-model="itemLocal.image"
      />
      <ErrorMessage name="image" class="error-feedback" />
      <img
        :src="itemLocal.image"
        alt=""
        class="rounded mx-auto d-block img-detail"
      />
    </div>
    <div class="form-group form-check">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="itemLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Sản phẩm yêu thích</strong>
      </label>
    </div>
    <div class="form-group edit-btn">
      <button class="btn return-btn">
        <i class="fa-solid fa-download"></i>
        <span class="px-2 font-weight-bolder">Lưu</span>
      </button>
      <button
        v-if="itemLocal._id"
        type="button"
        class="ml-2 btn return-btn"
        @click="deleteItem"
      >
        <i class="fa-solid fa-trash"></i>
        <span class="px-2 font-weight-bolder">Xóa</span>
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:item", "delete:item"],
  props: {
    item: { type: Object, required: true },
  },
  data() {
    const itemFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(200, "Tên có nhiều nhất 200 ký tự."),
      price: yup.number().required("Phải có giá sản phẩm"),
      description: yup
        .string()
        .required("Miêu tả phải có giá trị")
        .min(10, "Mô tả phải ít nhất 10 ký tự."),
      image: yup.string().required("Phải có ảnh sản phẩm"),
    });
    return {
      itemLocal: this.item,
      itemFormSchema,
    };
  },
  methods: {
    submitItem(e) {
      this.$emit("submit:item", this.itemLocal);
    },
    deleteItem() {
      this.$emit("delete:item", this.itemLocal.id);
    },
  },
};
</script>
<style>
@import "@/assets/form.css";
</style>
