<template>
  <div class="main">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="视频上传" name="upload">
      </el-tab-pane>
      <el-tab-pane label="数据处理" name="dataProcessing">
      </el-tab-pane>
      <el-tab-pane label="轨迹预测" name="predict"></el-tab-pane>
    </el-tabs>
    <UploadVideo v-if="activeName==='upload'" @tabChange="handleNext"/>
    <DataProcess v-if="activeName==='dataProcessing'" @tabChange="handleNext"/>
    <PredictResult v-if="activeName==='predict'" @tabChange="handleNext"/>
  </div>
</template>
<script>
  import UploadVideo from "@/views/main/upload/UploadVideo.vue";
  import DataProcess from "@/views/main/dataProcess/DataProcess.vue";
  import PredictResult from "@/views/main/predict-result/PredictResult.vue";

  export default {
    name: "MainIndex",
    components: {PredictResult, DataProcess, UploadVideo},
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