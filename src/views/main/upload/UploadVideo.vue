<template>
  <div class="upload-container">
    <div
      v-if="flag === 'done'"
      class="video-info"
    >
      <span>视频名称：{{ $store.state.uploadVideoInfo?.output_filename }}</span>
      <span>视频帧率：{{ $store.state.uploadVideoInfo?.frame_rate }}</span>
    </div>
    <el-upload
      v-if="!flag"
      class="upload-video"
      drag
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :on-change="beforeVideoUpload"
      accept=".mp4,.video,.flv,.rmvb,.avi,.mov,.wmv,.mkv,.webm,.mpg,.mpeg,.asf,.rm,"
      action="http://zvjpi5.natappfree.cc/api/v1/bs/upload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <LoadingComponent
      v-if="flag === 'loading'"
      text="视频上传中"
    />
    <video
      v-if="flag === 'done'"
      :src="$store.state.videoInfo?.url"
      class="avatar"
      controls="controls"
    />
    <div
      v-if="flag === 'done'"
      class="upload-footer"
    >
      <el-button @click="handleUploadAgain" round>重新上传</el-button>
      <el-button @click="handleNextStep" type="primary" plain round>下一步</el-button>
    </div>
  </div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  name: "UploadVideo",
  components: {LoadingComponent},
  data() {
    return {
      flag: "",
      a: 'dsfgh',
    }
  },
  methods: {
    beforeVideoUpload(file) {
      console.log('gile', file)
      this.flag = "loading";
      let URL = window.URL || window.webkitURL;
      this.$store.commit('setVideoInfo', {
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file.raw),
        raw: file.raw,
        status: file.status,
      })
    },
    handleUploadSuccess(response, file, fileList) {
      console.log("上传成功", response, file, fileList,this.flag)
      this.$nextTick(() => {
        this.flag = "done";
      })
      console.log('this.flag', this.flag)
      this.$store.commit('setUploadVideoInfo', response)
    },
    handleNextStep() {
      this.$emit('tabChange', 'dataProcessing')
    },
    handleUploadAgain() {
      this.flag = undefined
      this.url = undefined
      this.$store.commit('setUploadVideoInfo', undefined)
      this.$store.commit('setVideoInfo', undefined)
    },
  }
}
</script>

<style lang="less" scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .video-info, .upload-footer {
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;
  }

  video {
    width: 600px;
    margin-bottom: 15px;
  }
}
</style>