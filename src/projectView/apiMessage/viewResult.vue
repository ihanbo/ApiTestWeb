<template>
    <div class="viewResult">
        <el-dialog title="测试结果" :visible.sync="resultViewStatus" width="45%">
            <el-collapse accordion>
                <el-collapse-item
                        v-for="(item, index) in resultData.resultShowData"
                        :key="index">
                    <template slot="title">
                        <div :style="item.attachment ? 'color:rgb(255, 74, 74)': 'color:#45b90c'">{{item.name}}</div>
                    </template>

                    <el-tabs type="card">
                        <el-tab-pane label="返回结果">
                            <el-scrollbar wrapStyle="max-height:540px;">
                                <div>
                                    <JsonViewer
                                            :expand-depth=6
                                            copyable
                                            sort
                                            v-model = "item.meta_datas.data[0].response.json"></JsonViewer>
<!--                                    <pre style="overflow: auto;">{{resultDeal(item.meta_datas.data[0].response.json)}}</pre>-->
                                </div>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane label="错误信息" v-if="item.attachment">
                            <div>
                                <pre style="overflow: auto">{{item.attachment}}</pre>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="返回信息">
                            <div v-for="(value, key) in item.meta_datas.data[0].response"
                                 :key="key">
                                <div style="color: #409eff"
                                     v-if="JSON.stringify(value) !== '{}' && key !== 'start_timestamp' && value && key !== 'json'">
                                    {{ key }}：
                                    <div style="color: #000000">{{ value }}</div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="请求信息">
                            <!--<div style="color: #409eff"-->
                            <!--v-if="!item.meta_datas.data[0].request.body">-->
                            <!--body：-->
                            <!--<pre style="overflow: auto;color: #000000">{{dealBody(item.meta_datas.data[0].request.body)}}</pre>-->
                            <!--</div>-->
                            <div v-for="(value, key) in item.meta_datas.data[0].request"
                                 :key="key">
                                <div style="color: #409eff"
                                     v-if="JSON.stringify(value) !== '{}' && key !== 'timeout'&& key !== 'verify' && value && key !== 'body'">
                                    {{ key }}：
                                    <pre style="overflow: auto;color: #000000">{{ value }}</pre>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <!--<el-button type="primary" v-clipboard:copy="JSON.stringify(item.meta_data.response_body)"-->
                    <!--size="small"-->
                    <!--style="position:absolute;right: 3%;">复制-->
                    <!--</el-button>-->

                    <!--<div v-for="(value, key) in item.meta_data.request">-->
                    <!--<div style="color: #409eff" v-if="JSON.stringify(value) !== '{}' && key !== 'start_timestamp'">-->
                    <!--{{ key }}：-->
                    <!--<div  style="color: #000000">{{ value }}</div>-->
                    <!--</div>-->

                    <!--</div>-->

                    <!--<div style="color: #409eff">返回结果：</div>-->
                    <!--<div>-->
                    <!--<pre style="overflow: auto" >{{resultDeal(item.meta_data.response.content)}}</pre>-->
                    <!--</div>-->
                    <!--<div style="color: red">错误信息：</div>-->
                    <!--<div>-->
                    <!--<pre style="overflow: auto">{{item.attachment}}</pre>-->
                    <!--</div>-->

                </el-collapse-item>
            </el-collapse>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import JsonViewer from 'vue-json-viewer'
    Vue.use(JsonViewer)

    export default {
        name: 'viewResult',
        data() {
            return {
                resultViewStatus: false,
                resultData: {
                    out: '',
                    resultShowData: [
                        {
                            name: null,
                            attachment: null,
                            meta_datas: {
                                data: [{
                                    request: {
                                        body: null,
                                        url: null,
                                        headers: null,
                                        data: null,
                                        params: null,
                                        json: null
                                    },
                                    response: {content: null, json: null}
                                }]
                            },
                        },
                    ],
                },
            }
        },
        methods: {
            resultDeal(save_result) {
                try {
                    save_result = JSON.parse(save_result);
                    save_result = JSON.stringify(save_result, null, 4);
                } catch (err) {
                    null;
                }
                return save_result
            },


            showResultData(save_result) {
                this.resultViewStatus = true;
                this.resultData.resultShowData =JSON.parse(save_result.replace(/\"/g, "\\\"").replace(/'/g, '"')
                    .replace(/True/g, '"true"').replace(/False/g, '"false"').replace(/None/g, '"none"'));
                // this.resultData.resultShowData =eval("("+(save_result.replace(/'/g, '"')
                //     .replace(/True/g, '"true"').replace(/None/g, '"none"'))+")");
            },
        },
    }
</script>
<style>
</style>
