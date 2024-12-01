<template>
  <div class="process-container">
    <LoadingComponent
        style="margin-top: 150px"
        v-if="loading"
        text="数据处理中"
    />
    <template v-if="!loading">
      <div class="process-main">
        <div class="video-container">
          <div class="old-video">
            <h4>原视频名称: {{ $store.state.uploadVideoInfo?.output_filename || '--' }}</h4>
            <video
                v-if="$store.state.videoInfo?.url"
                :src="$store.state.videoInfo?.url"
                class="avatar"
                controls="controls"
            />
          </div>
          <div class="new-video">
            <h4>新视频名称: {{ processVideoInfo?.output_video_pathname || '--' }}</h4>
<!--            <video-->
<!--                v-show="processVideo"-->
<!--                class="avatar"-->
<!--                controls="controls"-->
<!--            />-->
<!--            <video-player ref="videoPlayer" :options="playerOptions"></video-player>-->
<!--            <vue-media-player-->
<!--                 :ref="mediaPlayerRef"-->
<!--                 :source="mediaSource"-->
<!--                 :options="playerOptions"-->
<!--            ></vue-media-player>-->
            <video
                v-if="$store.state.videoInfo?.url"
                :src="$store.state.videoInfo?.url"
                class="avatar"
                controls="controls"
            />
            <LoadingComponent
                style="margin-top: 20px"
                v-else
                text="视频获取中"
            />
          </div>
        </div>
        <div class="right">
          <el-table
              height="320"
              :data="processTable"
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
          <el-form ref="form" :model="form" :rules="rules" label-width="125px">
            <el-form-item label="预测模型名称" required>
              <el-select v-model='form.model_name' placeholder="请选择">
                <el-option
                    v-for="item in algorithmList"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col>
                <el-form-item label="预测视频帧序号" prop="frame_id" required>
                  <el-input
                      v-model="form.frame_id"
                      class="input-frame-id"
                      placeholder="请选择"
                      type="number"
                      :min="min"
                      :max="max"
                  />
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="跳过帧数" prop="skip_frame_num" required>
                  <el-select v-model='form.skip_frame_num' placeholder="请选择">
                    <el-option key="1" :value="1" label="1"/>
                    <el-option key="2" :value="2" label="2"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="预测观测帧数" required>
                  <el-select v-model='form.obs_frame_num' placeholder="请选择">
                    <el-option key="8" :value="8" label="8"/>
                    <el-option key="12" :value="12" label="12"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="预测未来帧数" required>
                  <el-select v-model='form.pred_frame_num' placeholder="请选择">
                    <el-option key="8" :value="8" label="8"/>
                    <el-option key="12" :value="12" label="12"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="process-footer">
        <el-button @click="handleBeforeStep" round>上一步</el-button>
        <el-button @click="handleNextStep" type="primary" plain round>下一步</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent.vue";
// import VueMediaPlayer from 'vue-media-player';
export default {
  name: "DataProcess",
  components: {
    LoadingComponent,
    // VueMediaPlayer
  },
  data() {
    return {
      algorithmList: [],
      processVideoInfo: {},
      processVideo: undefined,
      processTable: [],
      loading: true,
      mediaSource: '',
      mediaPlayerRef: 'mediaPlayer',
      playerOptions: {
        autoplay: false,
        controls: true
      },
      form: {
        model_name: undefined,
        frame_id: undefined,
        skip_frame_num: 1,
        pred_frame_num: 8,
        obs_frame_num: 12,
      },
      min: 1,
      max: 10,
      rules:
          {
            model_name: [
              {
                required: true,
                trigger: 'blur',
                message: "请选择预测模型名称",
              }
            ],
            pred_frame_num: [
              {
                required: true,
                trigger: 'blur',
                message: "请选择预测未来帧数",
              }
            ],
            skip_frame_num: [
              {
                message: "请选择跳过帧数",
                required: true,
                trigger: 'blur',
              }
            ],
            obs_frame_num: [
              {
                required: true,
                trigger: 'blur',
                message: "请选择预测观测帧数",
              }
            ],
            frame_id: [
              {
                required: true,
                trigger: 'blur',
                validator: (rule, value, callback) => {
                  if (value === '') {
                    callback(new Error('请输入预测视频帧序号'));
                  } else {
                    if (+value > this.max || +value < this.min) {
                      callback(new Error(`预测视频帧序号大小应在${this.min}到${this.max}之间`));
                    }
                    callback();
                  }
                }
              }
            ]
          },
    }
  },
  created() {
    this.getAlgorithmList();
    console.log('this.process', this.process)
    this.process();
    // if (this.$store.state.uploadVideoInfo?.output_filename) {
    //   fetch(`http://e83tzp.natappfree.cc/api/v1/bs/process?video_filename=${this.$store.state.uploadVideoInfo.output_filename}`)
    //       .then((response) => response.json()).then((res) => {
    //     console.log('process res', res)
    //     this.processVideoInfo = res;
    //     if (res.output_video_pathname) {
    //       fetch(`http://e83tzp.natappfree.cc/api/v1/bs/process/video?output_video_pathname=${res.output_video_pathname}`)
    //           .then((response) => response.blob()).then(async (blob) => {
    //         console.log('video blob', blob)
    //         const url = window.URL.createObjectURL(blob);
    //         console.log('url', url);
    //         this.processVideo = url;
    //       })
    //     }
    //     if (res.output_table_pathname) {
    //       fetch(`http://e83tzp.natappfree.cc/api/v1/bs/process/table?output_table_pathname=${res.output_table_pathname}`)
    //           .then((response) => response.json()).then((res) => {
    //         console.log('table res', res)
    //         this.processTable = res || [];
    //       })
    //     }
    //   })
    // }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    handleNextStep() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store.commit("setPredictForm", {
            ...this.form,
            ...this.processVideoInfo,
            frame_id: +this.form.frame_id,
          });
          this.$emit('tabChange', 'predict')
        } else {
          this.$message.error("请检查输入的内容")
        }
      })
    },
    handleBeforeStep() {
      this.$emit('tabChange', 'upload')
    },
    process() {
      if (this.$store.state.uploadVideoInfo?.output_filename) {
        fetch(`http://e83tzp.natappfree.cc/api/v1/bs/process?video_filename=${this.$store.state.uploadVideoInfo.output_filename}`)
            .then((response) => response.json()).then((res) => {
          console.log('process res', res)
          this.processVideoInfo = res;
          this.getProcessTable();
          this.getProcessVideo();
        })
      }
    },
    getProcessVideo() {
      if (this.processVideoInfo.output_video_pathname) {
        fetch(`http://e83tzp.natappfree.cc/api/v1/bs/process/video?output_video_pathname=${this.processVideoInfo.output_video_pathname}`)
            .then((response) => response.blob()).then(async (blob) => {
          console.log('video blob', blob)
          this.loading = false;
          if (blob) {
            const mockBlobData = new Blob([blob], { type: 'video/mp4' });
            const url = URL.createObjectURL(mockBlobData);
            this.processVideo = url;
            this.mediaSource = url;
          }
        })
      }
    },
    getProcessTable() {
      if (this.processVideoInfo.output_table_pathname) {
        fetch(`http://e83tzp.natappfree.cc/api/v1/bs/process/table?output_table_pathname=${this.processVideoInfo.output_table_pathname}`)
            .then((response) => response.json()).then((res) => {
          console.log('table res', res)
          this.processTable = res || [];
          this.loading = false;
          this.min = Math.min(...(res || []).map((item) => item.frame_id))
          this.max = Math.max(...(res || []).map((item) => item.frame_id))
        })
      }
    },
    getAlgorithmList() {
      // 获取算法枚举数据
      fetch('http://e83tzp.natappfree.cc/api/v1/bs/enum')
          .then((response) => response.json()).then((res) => {
        console.log('enum res', res)
        this.algorithmList = res || [];
      })
    }
  }
}
</script>

<style scoped>
.process-container {
  .process-main {
    display: flex;

    .video-container {
      .old-video, .new-video {
        display: flex;
        flex-direction: column;

        video {
          margin-top: 10px;
          width: 400px;
          height: 225px;
        }
      }

      .new-video {
        margin-top: 20px;
      }
    }

    .el-table {
      overflow: scroll;
      margin-left: 20px;
    }

    .el-form {
      margin-top: 20px;


      .input-frame-id {
        width: 192px;
      }
    }
  }

  .process-footer {
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;
  }
}
</style>