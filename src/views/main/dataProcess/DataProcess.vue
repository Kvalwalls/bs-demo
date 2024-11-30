<template>
  <div class="upload-container">
    <LoadingComponent
      text="数据处理中"
    />
    <div
      class="process-footer"
    >
      <el-button @click="handleBeforeStep" round>上一步</el-button>
      <el-button @click="handleNextStep" type="primary" plain round>下一步</el-button>
    </div>
  </div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  name: "DataProcess",
  components: {LoadingComponent},
  data() {
    return {
      videoFlag: undefined,
      url: ""
    }
  },
  methods: {
    handleNextStep() {
      this.$emit('tabChange', 'dataProcessing')
    },
    handleBeforeStep() {
      this.$emit('tabChange', 'upload')
    },

  }
}
</script>

<style scoped>

</style>