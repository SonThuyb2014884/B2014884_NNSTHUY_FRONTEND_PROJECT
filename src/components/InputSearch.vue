<script>
export default {
  props: {
    modelValue: { type: String, default: "" },
  },
  
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    submit() {
      this.$emit("submit");
    },
  
  },
};
</script>

<template>
  
  <div class="input-group rounded input-search">
    <button class="btn btn-outline-secondary search-icon" type="button">
      <i class="fas fa-search"></i>
    </button>

    <input
      type="text"
      class="form-control search-text"
      placeholder="Nhập thông tin cần tìm"
      :value="modelValue"
      @input="updateModelValue"
      @keyup.enter="submit"
    />
   
  </div>
</template>
