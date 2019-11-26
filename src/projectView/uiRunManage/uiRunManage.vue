<template>
    <div class="uiRunManager" v-loading="this.loading">
        <h3 style="text-align:center">运行参数设置</h3>
        <el-form style="padding: 10px 20px -10px 10px;width: 700px;"  label-width="120px">
            <el-form-item inline="true" prop="name" label="待测APP" style="margin-bottom: 5px">
                <el-input  v-model="form.app_path" readonly></el-input>
                <el-upload
                        class="upload-demo"
                        :action="this.$api.apkFileUploadApi"
                        :on-success="getApkFileAddress"
                        :show-file-list='true'
                >
                    <el-button size="small" icon="el-icon-upload2" >点击上传APK文件</el-button>
                </el-upload>
            </el-form-item >
            <el-form-item label="测试时长（秒）" style="margin-bottom: 5px">
                <el-input v-model="form.time"></el-input>
            </el-form-item>
            <el-form-item label="Appium URL" style="margin-bottom: 5px">
                <el-input v-model="form.appurl" placeholder="http://127.0.0.1:4723/wd/hub" ></el-input>
            </el-form-item>
            <el-form-item label="Capability" style="margin-bottom: 5px">
                <el-input v-model="form.capability" placeholder="输入Appium Capability k1=v1,k2=v2... "></el-input>
            </el-form-item>
            <el-form-item label="配置文件" style="margin-bottom: 5px">
                <el-input v-model="form.appconfig"
                          type="textarea"
                          :autosize="{ minRows: 10, maxRows: 50}"
                          placeholder="请输入配置内容"
                ></el-input>
            </el-form-item>

            <el-button
                    type="primary"
                    @click.native="runUiCaseApi()"
                    size="small"
                    style="margin-left: 350px;margin-top:20px"
            >运行</el-button>
        </el-form>


    </div>
</template>

<script>
    // import yaml from  '../util/yaml.js'

    export default {
        name: "uiRunManager",
        components: {
        },
        data() {
            return {
                str : null,
                fileList: null,
                loading:false,
                form: {
                    time:null,
                    appurl:null,
                    capability:null,
                    appconfig:null,
                    app_path: null,
                },
            }
        },

        methods: {
            //  初始化页面所需要的数据
            initBaseData() {
                this.queryUiConfig()
            },
            //查询运行参数
            queryUiConfig() {
                this.$axios.post(this.$api.queryAppRunConfigApi, {}).then((response) => {
                    if(response['status'] === 0){ //异常
                        this.$message({
                            showClose: true,
                            message: response.data['msg'],
                            type: 'warning',
                        });
                    }else{
                        this.form.time = response.data['data']['time'],
                        this.form.appurl = response.data['data']['appurl'],
                        this.form.capability = response.data['data']['capability'],
                        this.form.appconfig = response.data['data']['appconfig'],
                        this.form.app_path = response.data['data']['app_path']
                    }
                })
            },
            //快速运行ui case
            runUiCaseApi(){
                this.loading = true;
                if(this.form.time === "" || this.form.time === null){
                    this.$message({
                        showClose: true,
                        message: "测试时长不能为空",
                        type: "warning"
                    });
                    this.loading = false;
                    return;
                }
                if(this.form.appconfig === "" || this.form.appconfig === null){
                    this.$message({
                        showClose: true,
                        message: "配置文件内容不能为空",
                        type: "warning"
                    });
                    this.loading = false;
                    return;
                }
                this.loading = true;
                this.$axios.post(this.$api.addAppRunConfigApi, {
                    'app_path': this.form.app_path,
                    'appconfig': this.form.appconfig,
                    'capability': this.form.capability,
                    'appurl': this.form.appurl,
                    'time': this.form.time,
                }).then((response) => {
                    this.messageShow(this, response);
                    this.queryUiConfig()
                    this.loading = false;
                })
                this.loading = false;
            },
            getApkFileAddress(response,file){
                if (response['status'] === 0) {
                    this.$confirm('已存在相同名字的文件，是否覆盖?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading = true;
                        let form = new FormData();
                        form.append("file", file.raw);
                        form.append("skip", '1');
                        this.$axios.post(this.$api.apkFileUploadApi,form ).then((response) => {
                                this.$message({
                                    showClose: true,
                                    message: response.data['msg'],
                                    type: 'success',
                                });
                                this.loading = false;
                                this.form.app_path = response['data']['data'];
                            }
                        );
                    }).catch(() => {

                    });
                }
                else if(response['status'] === 1){
                    if (response['msg']) {
                        this.$message({
                            showClose: true,
                            message: response['msg'],
                            type: 'success',
                        });
                    }
                    this.form.app_path = response['data'];
                    this.loading = false;
                }
                else if(response['status'] === 2){
                    if (response['msg']) {
                        this.$message({
                            showClose: true,
                            message: response['msg'],
                            type: 'warning',
                        });
                        this.loading = false;
                    }
                }
            },

        },

        created() {
            // 数据生成之后先初始化数据
            this.initBaseData();
        },
    }
</script>
<style>
    .uiRunManager{
        width:750px;
        margin: 0 auto;
        border: 0 ;
        padding: auto;


    }

    .cm-s-default .cm-property {
        color: rgb(183, 40, 135);
        /*color: rgb(137, 21, 99);*/
    }

    .cm-s-default .cm-string {
        /*color: rgb(116,88,255);*/
        color: rgb(71, 35, 255);
    }

    .cm-s-default .cm-atom {
        color: #000000;
    }

    .h-b-e-a-style {
        background-color: rgb(250, 250, 250);
        /*min-height: 430px;*/
    }

</style>
