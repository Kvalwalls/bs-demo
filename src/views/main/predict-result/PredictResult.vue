<template>
  <div class="predict-container">
    <LoadingComponent
        style="margin-top: 150px"
        v-if="loading"
        text="预测中"
    />
    <template v-if="!loading">
      <div class="predict-main">
        <div class="left">
          <el-table
              :data="predictTable"
              style="width: 100%">
            <el-table-column
                prop="frame_id"
                label="视频帧序号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="person_id"
                label="行人序号"
                width="80">
            </el-table-column>
            <el-table-column
                prop="x"
                width="200"
                label="X坐标">
            </el-table-column>
            <el-table-column
                prop="y"
                width="200"
                label="Y坐标">
            </el-table-column>
          </el-table>
          <h4>预测ADE值: {{ predictFe?.ade || '--' }}</h4>
          <h4>预测FDE值: {{ predictFe?.fde || '--' }}</h4>
        </div>
        <img
            v-if="predictImage"
            :src="predictImage"
            alt=""/>
      </div>
      <div class="predict-footer">
        <el-button @click="handleBeforeStep" round>上一步</el-button>
        <el-button @click="handleOver" type="primary" plain round>结束</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  name: "PredictResult",
  components: {LoadingComponent},
  data() {
    return {
      predictInfo: {},
      predictImage: undefined,
      predictTable: [],
      loading: true,
      predictFe: undefined,
    }
  },
  created() {
    this.predict();
  },
  methods: {
    handleOver() {
      this.$emit('tabChange', 'upload')
      this.$store.commit('setUploadVideoInfo', undefined);
      this.$store.commit('setVideoInfo', undefined);
    },
    handleBeforeStep() {
      this.$emit('tabChange', 'dataProcessing');
    },
    predict() {
      if (this.$store.state.predictForm) {
        console.log('predict form', this.$store.state.predictForm)
        fetch('http://e83tzp.natappfree.cc/api/v1/bs/predict',
            {
              method: 'POST',
              body: JSON.stringify(this.$store.state.predictForm),
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            })
            .then((response) => response.json()).then((res) => {
          console.log('predict res', res)
          this.predictInfo = res;
          this.getPredictTable();
          this.getPredictImage();
          this.getPredictFe();
        })
      }
    },
    getPredictImage() {
      if (this.predictInfo.predict_image_pathname) {
        fetch(`http://e83tzp.natappfree.cc/api/v1/bs/predict/image?predict_image_pathname=${this.predictInfo.predict_image_pathname}`)
            .then((response) => response.blob()).then(async (blob) => {
          console.log('video blob', blob)
          const url = window.URL.createObjectURL(blob);
          console.log('url', url);
          this.predictImage = url;
          this.loading = false;
        })
      }
    },
    getPredictTable() {
      if (this.predictInfo.predict_table_pathname) {
        fetch(`http://e83tzp.natappfree.cc/api/v1/bs/predict/table?predict_table_pathname=${this.predictInfo.predict_table_pathname}`)
            .then((response) => response.json()).then((res) => {
          console.log('table res', res)
          this.predictTable = res || [];
        })
      }
    },
    getPredictFe() {
      if (this.predictInfo.predict_table_pathname) {
        fetch(`http://e83tzp.natappfree.cc/api/v1/bs/predict/eval?predict_table_pathname=${this.predictInfo.predict_table_pathname}`)
            .then((response) => response.json()).then((res) => {
          console.log('table res', res)
          this.predictFe = res || [];
        })
      }
    },
  }
}
</script>

<style scoped>
.predict-container {
  .predict-main {
    display: flex;

    img {
      margin-top: 10px;
      margin-left: 40px;
      width: 400px;
      height: 400px;
    }

    h4 {
      display: inline-block;
      margin-left: 20px;
      margin-top: 20px;
    }
  }

  .el-table {
    overflow-y: scroll;
    max-height: 250px;
    margin-left: 20px;
  }

  .predict-footer {
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;
    margin-top: 20px;
  }
}
</style>