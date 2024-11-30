<template>
  <div class="loading-container">
    <div class="loading-text">{{ text }}</div>
  </div>
</template>

<script>
  export default {
    name: 'LoadingComponent',
    data() {
      return {
      }
    },
    props: {
      text: {
        default: '处理中'
      },
    }
  }
</script>

<style lang="less" scoped>
@import '../assets/animate.css';
.loading-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  animation: spin 1.5s linear infinite;
  margin: 0 auto;
  position: relative;
}

.loading-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #3498db;
  animation: reverse-spin;
}
</style>
