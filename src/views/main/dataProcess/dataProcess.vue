<template>
  <div class="upload-container">
    <div
        v-if="videoFlag === 'done'"
        class="video-info"
    >
      <span>视频名称：{{ $store.uploadVideoInfo?.output_filename }}</span>
      <span>视频帧率：{{ $store.uploadVideoInfo?.frame_rate }}</span>
    </div>
    <el-upload
        v-if="!videoFlag"
        class="upload-video"
        drag
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :on-change="beforeVideoUpload"
        accept=".mp4,.video,.flv,.rmvb,.avi,.mov,.wmv,.mkv,.webm,.mpg,.mpeg,.asf,.rm,"
        action="http://5qi7ea.natappfree.cc/api/v1/bs/upload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div v-if="videoFlag === 'loading'" class="loading-container"></div>
    <video v-if="url" :src="url" class="avatar" controls="controls"></video>
    <!--    <video v-if="$store.videoInfo?.url" :src="$store.videoInfo?.url" class="avatar" controls="controls"></video>-->
    <div
        class="upload-footer"
    >
      <el-button @click="handleUploadAgain" round>重新上传</el-button>
      <el-button @click="handleNextStep" type="primary" plain round>下一步</el-button>
    </div>
  </div>
</template>

<script>
import {Loading} from 'element-ui';

export default {
  name: "dataProcess",
  data() {
    return {
      videoFlag: undefined,
      url: ""
    }
  },
  methods: {
    beforeVideoUpload(file) {
      console.log('gile', file)
      this.videoFlag = "loading";
      setTimeout(() => {
        Loading.service({
          fullscreen: false,
          target: document.querySelector(".loading-container"),
          text: '正在上传视频...',
        });
      }, 100)
      let URL = window.URL || window.webkitURL;
      this.url = URL.createObjectURL(file.raw);
      console.log(this.url)
      this.$store.commit('setVideoInfo', {
        name: file.name,
        size: file.size,
        url: this.url,
        raw: file.raw,
        status: file.status,
      })
      console.log('$store.videoInfo?.url', this.$store.videoInfo?.url)
    },
    handleUploadSuccess(response, file, fileList) {
      console.log("上传成功", response, file, fileList)
      this.videoFlag = "done"
      this.$store.commit('setUploadVideoInfo', response)
    },
    handleNextStep() {
      this.$emit('next', 'dataProcessing')
    },
    handleUploadAgain() {
      this.videoFlag = undefined
      this.url = undefined
      this.$store.commit('setUploadVideoInfo', undefined)
      this.$store.commit('setVideoInfo', undefined)
    },
  }
}
</script>

<style scoped>
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

  .loading-container {
    width: 200px;
    height: 200px;
  }

  video {
    width: 600px;
    margin-bottom: 15px;
  }
}
</style>