<template>
  <div class="confirm-dialog">
    <div class="message">{{ message }}</div>
    <div class="buttons">
      <button @click="handleCancel">取消</button>
      <button @click="handleConfirm">确认</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
  methods: {
    handleCancel() {
      this.$emit("onCancel");
    },
    handleConfirm() {
      this.$emit("onConfirm");
    },
  },
};
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
.confirm-dialog {
	position: absolute;
	top: 45rem;
  width: 50%;
  z-index: 55;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.message {
  font-size: 16px;
  margin-bottom: 10px;
}

.buttons {
	width: 80%;
  display: flex;
  justify-content: space-between;
}

button {
  padding: 8px 16px;
  border: none;
  background-color: #007BFF;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
</style>
