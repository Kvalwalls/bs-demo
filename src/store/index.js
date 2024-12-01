import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 上传接口返回结果
        uploadVideoInfo: undefined,
        //   原来的视频信息
        videoInfo: undefined,
        //   预测表单
        predictForm: undefined,
    },
    mutations: {
        setUploadVideoInfo(state, data) {
            state.uploadVideoInfo = data
        },
        setVideoInfo(state, data) {
            state.videoInfo = data
        },
        setPredictForm(state, data) {
            state.predictForm = data
        },
    },
    actions: {},
    modules: {}
})