<template>
  <div class="welcome">
    <span>欢迎使用轨迹预测方法研究原型系统</span>
    <span>V1.0</span>
    <el-button type="primary" plain round @click="handleStart">开始使用</el-button>
  </div>
</template>

<script>
export default {
  name: "WelcomePage",
  methods: {
    handleStart() {
      console.log(this, this.$route)
      this.$router.push({
        path: '/main'
      })
    }
  }
}
</script>

<style scoped>
.welcome {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: 30px;

  .el-button {
    margin-top: 20px;
  }
}
</style>
