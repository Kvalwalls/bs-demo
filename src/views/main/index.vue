<template>
  <div class="main">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="视频上传" name="upload">
        <UploadVideo @tabChange="handleNext"/>
      </el-tab-pane>
      <el-tab-pane label="数据处理" name="dataProcessing">
        <DataProcess @tabChange="handleNext"/>
      </el-tab-pane>
      <el-tab-pane label="轨迹预测" name="trajectoryPrediction">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import UploadVideo from "@/views/main/upload/UploadVideo.vue";
  import DataProcess from "@/views/main/dataProcess/DataProcess.vue";

  export default {
    name: "MainIndex",
    components: {DataProcess, UploadVideo},
    data () {
      return {
        activeName: "upload"
      }
    },
    methods: {
      handleNext(name) {
        this.activeName = name;
      }
    }

  }
</script>
<style scoped>
.main{
  margin-top: 20px;
  //position: absolute;
  //top: 100px;
  //left: 50%;
  //transform: translate(-50%);

}
</style>